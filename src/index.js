const { app, BrowserWindow, ipcMain } = require("electron");
const routes = require("./mainScripts/router");
const views = require("./mainScripts/views");
const path = require("path");
const fs = require("fs");
const { createFoodItem } = require("./mainScripts/items");
const { logUserIn, createNewUser } = require("./mainScripts/users");
const { createOrder } = require("./mainScripts/orders");
const { connectToDb, initializeDb } = require("./mainScripts/db");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "GCTU Canteen",
    icon: `${__dirname}/images/icon.jpg`,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "./rendererScripts/preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "./index.html"));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  // Connect to database
  const database = await connectToDb();

  // Run 'migration'
  initializeDb(database);

  // Create app window
  createWindow();

  // Set the default route
  const { name, template, script } = await routes.Home();
  state.currentRouteName = name;
  state.currentRouteContent = template;
  state.currentRouteScript = script;
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    // Delete temporary folder
    const tmp = `${__dirname}\\mainScripts\\tmp`;
    if (fs.existsSync(tmp)) {
      fs.rmSync(tmp, { recursive: true });
    }
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Application state
const state = {
  currentRouteName: null,
  currentRouteContent: null,
  currentRouteScript: null,
  currentViewName: null,
  currentViewContent: null,
  currentViewScript: null,
  currentUser: null,
  loggedIn: false,
};

// IPC handlers
const handleDefaultRoute = (state) => {
  const name = state.currentRouteName;
  const template = state.currentRouteContent;
  const script = state.currentRouteScript;
  return { name, template, script };
};

const handleNavigateToRoute = async (state, routes, routeName) => {
  // if (state.currentRouteName === routeName) {
  //   return;
  // } else {
  //   state.currentRouteName = routeName;
  // }
  if (routes && routeName in routes) {
    const route = routes[routeName]().then((routeData) => {
      return routeData;
    });
    return route;
  }
};

const handleCreateUser = async (state, user) => {
  const database = await connectToDb();
  createNewUser(database, user);
  delete user.name;
  const currentUser = await handleLogin(state, user);
  if (currentUser) {
    state.currentUser = currentUser;
    return currentUser;
  }
  return;
};

const handleLogin = async (state, user) => {
  const database = await connectToDb();
  const currentUser = logUserIn(database, user);
  if (currentUser) {
    state.currentUser = currentUser;
    state.loggedIn = true;
    return currentUser;
  }
};

const handleGetCurrentUser = (state) => {
  return state.currentUser;
};

const handleCreateOrder = async (order) => {
  const database = await connectToDb();
  return createOrder(database, order);
};

// Users
ipcMain.handle("users:create", (_event, user) => handleCreateUser(state, user));
ipcMain.handle("users:login", (_event, user) => handleLogin(state, user));
ipcMain.handle("users:currentUser", (_event) => handleGetCurrentUser(state));

// Items
ipcMain.handle("db:createNewItem", async (_event, item) => {
  const database = await connectToDb();
  createFoodItem(database, item);
});

// Orders
ipcMain.handle("db:createNewOrder", (_event, order) => {
  handleCreateOrder(order);
});

// Routes
ipcMain.handle("routes:getDefaultRoute", () => handleDefaultRoute(state));

ipcMain.handle("routes:navigateToRoute", (_event, routeName) =>
  handleNavigateToRoute(state, routes, routeName)
);
