// Define selectors for ease of use
const $ = (elementId) => document.getElementById(elementId);
const $$ = (elementclassName) =>
  document.getElementsByClassName(elementclassName);

const clearForm = () => {
  $("itemName").value = "";
  $("description").value = "";
  $("image").value = "";
  $("type").value = "";
  $("price").value = "";
  $("quantity").value = "";
};

// Add new food item
const addFoodBtn = $("submit");
addFoodBtn.addEventListener("click", (event, args) => {
  event.preventDefault();
  console.log("Script from main.js");
  const getFilePath = (file) => {
    if (file) {
      return file.path;
    }
    return "";
  };
  const image = $("image").files[0];
  console.log(image);
  let food = {
    name: $("itemName").value,
    description: $("description").value,
    type: $("type").value,
    price: $("price").value,
    image: getFilePath(image),
    quantity: $("quantity").value,
  };

  window.canteenAPI.createNewFood(food);

  console.log("Sent request to create new food");

  clearForm();
});
