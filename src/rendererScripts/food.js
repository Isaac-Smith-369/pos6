var food$ = (elementId) => document.getElementById(elementId);

let incrementBtn = food$("increment");
let decrementBtn = food$("decrement");
let totalAmount = food$("amount");

var increment = (e) => {
  let value = e.parentNode.children[1];
  value.innerText = parseInt(value.innerText) + 1;
};

var decrement = (e) => {
  let value = e.parentNode.children[1];
  value.innerText = parseInt(value.innerText) - 1;
};

// Todo
var pay = () => {};

// Todo
var clear = () => {};
