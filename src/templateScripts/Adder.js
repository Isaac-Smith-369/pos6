const Adder = () => {
  return `
    <div class="adder">
    <a href="#" id="increment" class="inline-btn" onClick="return increment(this)">+</a>
    <h2 id="count">1</h2>
    <a href="#" id="decrement" class="inline-btn" onClick="return decrement(this)">-</a>
  </div>
    `;
};

module.exports = Adder;
