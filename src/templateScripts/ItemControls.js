const ItemControls = () => {
  return `<div class="box box-container more-btn">
        <div class="total box">
          <h2 class="pay">TOTAL</h2>
          <h1 id="amount" class="amount">GH₵ 0</h1>
        </div>
        <div class="box">
          <a href="#!" id="pay" onclick="pay()" class="inline-option-btn">pay</a>
          <a href="#!" id="clear" onclick="clearCart()" class="inline-option-btn">clear</a>
        </div>
      </div>`;
};

module.exports = ItemControls;
