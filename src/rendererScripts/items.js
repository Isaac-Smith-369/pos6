var clearForm = () => {
  document.getElementById("itemName").value = "";
  document.getElementById("description").value = "";
  document.getElementById("image").value = "";
  document.getElementById("type").value = "";
  document.getElementById("price").value = "";
  document.getElementById("quantity").value = "";
};

var getFilePath = (file) => {
  if (file) {
    return file.path;
  }
  return "";
};

var handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);
  const item = { ...formProps, image: getFilePath(formProps.image) };
  window.itemsAPI.createNewFood(item);
  console.log("Sent request to create new food");
  clearForm();
  alert("Item added succesfully");
};

var itemForm = document.getElementById("item-form");
itemForm.addEventListener("submit", handleSubmit);
