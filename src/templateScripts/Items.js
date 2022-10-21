const ItemControls = require("./ItemControls");
const Adder = require("./Adder");

const Items = (name, items) => {
  const template = `
  <div class="with-side">
    <section class="courses">
      <h1 class="heading">${name}</h1>
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
            ${Adder()}
            </div>
            `;
            })
          : `No item have been added yet`
      }
      </div>
      ${ItemControls()}
    </section>
    </div>
  `;

  return template;
};

module.exports = Items;
