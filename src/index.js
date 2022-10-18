const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const routes = require("./mainScripts/router");
const { createFoodItem } = require("./mainScripts/items");
const { connectToDatabase, initializeDatabase } = require("./mainScripts/db");
const { createTmpDir } = require("./mainScripts/utils");

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
    icon: "./images/icon.jpg",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "./rendererScripts/preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "./index.html"));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  // Create app window
  createWindow();

  // Connect to database
  const db = connectToDatabase();
  initializeDatabase(db);

  // Set the default route
  state.currentRouteName = routes.Home.name;
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
};

// IPC (Inter-process communication)
// Handlers
const handleAddItemToDatabse = (database, item) => {
  // const db = connectToDatabase();
  createFoodItem(database, itemArr);
};
const handleDefaultRoute = (state) => {
  const template = state.currentRouteContent;
  const script = state.currentRouteScript;
  return { template, script };
};

const handleNavigateToRoute = (routes, routeName) => {
  if (routes && routeName in routes) {
    const route = routes[routeName]().then((routeData) => {
      return routeData;
    });
    return route;
  }
};

// Add a new food item to the database
ipcMain.on("db:addNewFood", (_event, item) => {
  const db = connectToDatabase();
  handleAddItemToDatabse(db, item);
});

// Get defaut route
ipcMain.handle("routes:getDefault", () => handleDefaultRoute(state));

// Navigate to a route
ipcMain.handle("routes:navigate", (_event, routeName) =>
  handleNavigateToRoute(routes, routeName)
);
