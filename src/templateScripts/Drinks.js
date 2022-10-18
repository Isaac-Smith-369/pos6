const { connectToDatabase } = require("../mainScripts/db");
const { getItems } = require("../mainScripts/items");

const Drinks = () => {
  // Get all items from the database
  let db = connectToDatabase();
  const content = getItems(db, "Drinks").then((items) => {
    const script = "./rendererScripts/food.js";
    const template = `<div class="with-side">
    <section class="courses">
      <h1 class="heading">DRINKS</h1>
      <div id="food-container" class="box-container">
      ${
        items.length >= 1
          ? items.map((item) => {
              return `
            <div class="box">
            <div class="thumb">
              <img src=${item.image} alt="" />
              <span>${item.quantity} items</span>
            </div>
            <h3 class="title">${item.name}</h3>
            <h3 class="title">${item.price}/ pack</h3>
            <div class="adder">
              <a href="#" class="inline-btn">+</a>
              <h2>2</h2>
              <a href="#" class="inline-btn">-</a>
            </div>
            </div>
            `;
            })
          : `No Items Have been added yet`
      }
      </div>
      <div class="box box-container more-btn">
        <div class="total box">
          <h2 class="pay">TOTAL PAY</h2>
          <h1 class="amount">GH₵ 80</h1>
        </div>
        <div class="box">
          <a href="#" class="inline-option-btn">pay</a>
          <a href="#" class="inline-option-btn">clear</a>
        </div>
      </div>
    </section>
    </div>`;
    return { template, script };
  });

  return content;
};

module.exports = Drinks;
