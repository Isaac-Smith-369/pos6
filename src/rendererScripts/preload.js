const { contextBridge, ipcRenderer } = require("electron");

const usersApiIndex = {
  createNewUser: (user) => ipcRenderer.invoke("users:create", user),
  logIn: (user) => ipcRenderer.invoke("users:login", user),
  getCurrentUser: () => ipcRenderer.invoke("users:currentUser"),
};

const routingApiIndex = {
  getDefaultView: () => ipcRenderer.invoke("routes:getDefaultView"),
  navigateToView: (view) => ipcRenderer.invoke("routes:navigateView", view),
  getDefaultRoute: () => ipcRenderer.invoke("routes:getDefaultRoute"),
  navigateToRoute: (route) => ipcRenderer.invoke("routes:navigateRoute", route),
};

const ItemsApiIndex = {
  getAllFoods: () => ipcRenderer.invoke("db:getAllFoods"),
  createNewFood: (food) => ipcRenderer.invoke("db:addNewFood", food),
};

contextBridge.exposeInMainWorld("usersAPI", usersApiIndex);
contextBridge.exposeInMainWorld("routingAPI", routingApiIndex);
contextBridge.exposeInMainWorld("itemsAPI", ItemsApiIndex);
