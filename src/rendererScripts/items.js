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
  window.itemsAPI.createNewItem(item);
  console.log("Sent request to create new food");
  document.getElementById("item-form").reset();
  alert("Item added successfully");
  navigateToRoute("AddItem");
};

var itemForm = document.getElementById("item-form");
itemForm.addEventListener("submit", handleSubmit);
