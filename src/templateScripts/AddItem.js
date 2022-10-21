const { generateRandomStr } = require("../mainScripts/utils");

const AddItem = async () => {
  const script = `./rendererScripts/items.js?d=${generateRandomStr()}`;
  const template = `
    <div class="with-side">
    <section class="courses">
      <h1 class="heading">NEW ITEM</h1>
    <div class="box-container">
      <form id="item-form">
        <label for="itemName" style="font-size: 16pt">Name</label>
        <input type="text" id="itemName" name="itemName" required /><br />

        <label for="type" style="font-size: 15pt">Type </label>
        <select id="type" name="type" required>
          <option value="Foods">Food</option>
          <option value="Drinks">Drinks</option></select
        ><br />

        <label for="price" style="font-size: 15pt">Price </label>
        <input type="number" id="price" name="price" required min="0" /><br />

        <label for="quantity" style="font-size: 15pt">Quantity </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          required
          min="1"
          max="100"
        /><br />

        <label for="image" style="font-size: 15pt">Choose image </label>
        <input type="file" id="image" name="image" required /><br />

        <label for="decription" style="font-size: 15pt; position: absolute"
          >Description
        </label>
        <textarea
          id="description"
          name="description"
          rows="10"
          cols="50"
          required
        ></textarea>
        <br />

        <button type="submit" id="submit" onSubmit="(e) => e.preventDefault()">Submit</button>
      </form>
    </div>
    </section>
  </div>
    `;

  return { template, script };
};

module.exports = AddItem;
