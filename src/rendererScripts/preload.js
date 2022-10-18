const { contextBridge, ipcRenderer } = require("electron");

const createNewFood = (food) => {
  console.log("Script from preload.js");
  // Send the `food` object to the main process
  // for procesing.
  ipcRenderer.send("db:addNewFood", food);
};

const getAllFoods = () => {
  const result = ipcRenderer.sendSync("db:getAllFoods");
  return result;
};

const routingApiIndex = {
  getDefaultView: () => ipcRenderer.invoke("routes:getDefault"),
  navigateTo: (route) => ipcRenderer.invoke("routes:navigate", route),
};

const ItemsApiIndex = {
  createNewFood: createNewFood,
  getAllFoods: getAllFoods,
};

contextBridge.exposeInMainWorld("routingAPI", routingApiIndex);
contextBridge.exposeInMainWorld("itemsAPI", ItemsApiIndex);
