const { contextBridge, ipcRenderer } = require("electron");

const usersApiIndex = {
  createNewUser: (user) => ipcRenderer.invoke("users:create", user),
  logIn: (user) => ipcRenderer.invoke("users:login", user),
  getCurrentUser: () => ipcRenderer.invoke("users:currentUser"),
};

const routingApiIndex = {
  getDefaultRoute: () => ipcRenderer.invoke("routes:getDefaultRoute"),
  navigateToRoute: (route) =>
    ipcRenderer.invoke("routes:navigateToRoute", route),
};

const itemsApiIndex = {
  createNewItem: (item) => ipcRenderer.invoke("db:createNewItem", item),
};

const ordersApiIndex = {
  getAllOrders: (user) => ipcRenderer.invoke("db:getAllOrders", user),
  createNewOrder: (order) => ipcRenderer.invoke("db:createNewOrder", order),
};

contextBridge.exposeInMainWorld("usersAPI", usersApiIndex);
contextBridge.exposeInMainWorld("routingAPI", routingApiIndex);
contextBridge.exposeInMainWorld("itemsAPI", itemsApiIndex);
contextBridge.exposeInMainWorld("ordersAPI", ordersApiIndex);
