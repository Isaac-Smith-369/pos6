var drinks$ = (elementId) => document.getElementById(elementId);

var incrementBtn = drinks$("increment");
var decrementBtn = drinks$("decrement");
var totalAmount = drinks$("amount");
var cartCount = drinks$("cartCount");

var increment = (e) => {
  // Arrange
  let nodes = e.parentNode.parentNode.children;
  let itemName = nodes[1].innerText;
  let itemPrice = nodes[2];
  let itemCount = nodes[3].children[1];

  // Act
  let count = parseInt(itemCount.innerText) + 1;
  let price = parseFloat(itemPrice.innerText) * count;

  // Create an order item object to store metadata of the current sae
  let orderItem = {
    item: itemName,
    quantity: count,
    total: price,
  };

  // Save the order item into a 'cart'
  if (!appState.cart.find((cartItem) => cartItem.item === itemName)) {
    appState.cart.push(orderItem);
  } else {
    appState.cart.forEach((cartItem) => {
      if (cartItem.item === itemName) {
        cartItem.total = price;
        cartItem.quantity = count;
      }
    });
  }

  // Calculate the total price of stuff in the cart
  let total = 0;
  appState.cart.forEach((cartItem) => {
    total += cartItem.total;
  });

  itemCount.innerText = `${count}`;
  cartCount.innerHTML = appState.cart.length;
  totalAmount.innerText = `GH₵ ${total}`;
};

var decrement = (e) => {
  // Arrange
  let nodes = e.parentNode.parentNode.children;
  let itemName = nodes[1].innerText;
  let itemPrice = nodes[2];
  let itemCount = nodes[3].children[1];

  // Act
  let count = parseInt(itemCount.innerText);
  if (count !== 0) {
    count -= 1;
  } else {
    return false;
  }

  let price = parseFloat(itemPrice.innerText) * count;

  let orderItem = {
    item: itemName,
    quantity: count,
    total: price,
  };

  if (!appState.cart.find((cartItem) => cartItem.item === itemName)) {
    appState.cart.push(orderItem);
  } else {
    appState.cart.forEach((cartItem) => {
      if (cartItem.item === itemName) {
        cartItem.total = price;
        cartItem.quantity = count;
      }
    });
  }

  let total = 0;
  appState.cart.forEach((cartItem) => {
    total += cartItem.total;
  });

  itemCount.innerText = `${count}`;
  cartCount.innerHTML = appState.cart.length;
  totalAmount.innerText = `GH₵ ${total}`;
};

// Hacky stuff below
var pay = () => {
  checkout();
};

var clearCart = () => {
  navigateToRoute("Home");
};
