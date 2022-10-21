const { app, BrowserWindow, ipcMain } = require("electron");
const routes = require("./mainScripts/router");
const views = require("./mainScripts/views");
const path = require("path");
const fs = require("fs");
const { createFoodItem } = require("./mainScripts/items");
const { logUserIn, createNewUser } = require("./mainScripts/users");
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

  // Set the default view
  if (state.currentUser) {
    state.currentViewName = "Container";
    views.Container().then(({ template, script }) => {
      state.currentViewContent = template;
      state.currentViewScript = script;
    });
  } else {
    state.currentViewName = "Login";
    views.Login().then(({ template, script }) => {
      state.currentViewContent = template;
      state.currentViewScript = script;
    });
  }

  // Set the default route
  state.currentRouteName = "Home";
  routes.Home().then(({ template, script }) => {
    state.currentRouteContent = template;
    state.currentRouteScript = script;
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    // Delete temporary folder
    fs.rmSync(`${__dirname}/mainScripts/tmp`, { recursive: true });
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
};

// IPC handlers

const handleDefaultView = (state) => {
  const template = state.currentViewContent;
  const script = state.currentViewScript;
  return { template, script };
};

const handleDefaultRoute = (state) => {
  const template = state.currentRouteContent;
  const script = state.currentRouteScript;
  return { template, script };
};

const handleNavigateToRoute = async (state, routes, routeName) => {
  if (state.currentRouteName === routeName) {
    return;
  } else {
    state.currentRouteName = routeName;
  }
  if (routes && routeName in routes) {
    const route = routes[routeName]().then((routeData) => {
      return routeData;
    });
    return route;
  }
};

const handleNavigateToView = async (state, views, viewName) => {
  if (state.currentViewName === viewName) {
    return;
  } else {
    state.currentViewName = viewName;
  }
  if (views && viewName in views) {
    const view = views[viewName]().then((viewData) => {
      return viewData;
    });
    return view;
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
    return currentUser;
  }
};

const handlegetCurrentUser = (state) => {
  return state.currentUser;
};

// Create a new user
ipcMain.handle("users:create", (_event, user) => handleCreateUser(state, user));
ipcMain.handle("users:login", (_event, user) => handleLogin(state, user));
ipcMain.handle("users:currentUser", (_event) => handlegetCurrentUser(state));

// Add a new food item to the database
ipcMain.handle("db:addNewFood", async (_event, item) => {
  const database = await connectToDb();
  createFoodItem(database, item);
});

// Get defaut View
ipcMain.handle("routes:getDefaultView", () => handleDefaultView(state));

// Get defaut Route
ipcMain.handle("routes:getDefaultRoute", () => handleDefaultRoute(state));

// Navigate to a route
ipcMain.handle("routes:navigateRoute", (_event, routeName) =>
  handleNavigateToRoute(state, routes, routeName)
);
// Navigate to a view
ipcMain.handle("routes:navigateView", (_event, viewName) =>
  handleNavigateToView(state, views, viewName)
);
