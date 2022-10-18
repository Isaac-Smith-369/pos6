const fs = require("fs");
const path = require("path");

const generateRandomStr = () => {
  let r = (Math.random() + 1).toString(36).substring(7);
  return r;
};

// Create a base64 string from an image
// Then convert the base64 string to a buffer (bytes)
const convertImageToBytes = (imagePath) => {
  const base64String = fs.readFileSync(imagePath, "base64");
  const buffer = Buffer.from(base64String, "base64");
  return buffer;
};

// Read bytes into an image file
const convertBytesToImage = (imageBlob) => {
  const imagePath = path.join(__dirname, `../tmp/${generateRandomStr()}.jpg`);
  fs.writeFileSync(imagePath, imageBlob);
  return imagePath;
};

// Return the version of the NodeJS environment
const nodeJSVersion = () => {
  return process.versions.node;
};

module.exports = {
  convertBytesToImage,
  convertImageToBytes,
  nodeJSVersion,
};
