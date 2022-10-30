const Adder = () => {
  return `
    <div class="adder">
    <a href="#!" id="increment" class="inline-btn" onClick="return decrement(this)">-</a>
    <h2 id="count">0</h2>
    <a href="#!" id="decrement" class="inline-btn" onClick="return increment(this)">+</a>
  </div>
    `;
};

module.exports = Adder;
