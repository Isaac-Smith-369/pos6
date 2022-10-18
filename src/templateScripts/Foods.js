const { connectToDatabase } = require("../mainScripts/db");
const { getItems } = require("../mainScripts/items");
const ItemControls = require("./ItemControls");

const Foods = () => {
  // Get all items from the database
  let db = connectToDatabase();
  const content = getItems(db, "Foods").then((items) => {
    const script = "./rendererScripts/food.js";
    const template = `<div class="with-side">
    <section class="courses">
      <h1 class="heading">FOODS</h1>
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
      ${ItemControls()}
    </section>
    </div>`;
    return { template, script };
  });

  return content;
};

module.exports = Foods;
