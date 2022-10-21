const { generateRandomStr } = require("../mainScripts/utils");

const Container = async () => {
  const script = `./rendererScripts/container.js?id=${generateRandomStr()}`;
  const template = `
    <!-- custom css file link  -->
    <link rel="stylesheet" href="./css/style.css" />
    <header class="header">
    <div class="flex">
      <a href="./views/food.html" class="logo">GCTU CANTEEN</a>
      <form action="search.html" method="post" class="search-form">
        <input
          type="text"
          name="search_box"
          required
          placeholder="search foods..."
          maxlength="100"
        />
        <button type="submit" class="fas fa-search"></button>
      </form>
      <div class="icons">
        <div id="menu-btn" class="fas fa-bars"></div>
        <div id="search-btn" class="fas fa-search"></div>
        <div id="user-btn" class="fas fa-user"></div>
        <div id="toggle-btn" class="fas fa-sun"></div>
      </div>
    </div>
  </header>
  <div class="side-bar">
    <div id="close-btn">
      <i class="fas fa-times"></i>
    </div>
    <div class="profile">
      <img src="./images/lu.jpg" class="image" alt="" />
      <h3 class="name" id="username"></h3>
      <p class="role">Cashier</p>
    </div>
    <nav class="navbar">
      <a href="#" data-route="Home" onclick="return navigate(this)"
        ><i class="fas fa-fork"></i><span>Foods</span></a
      >
      <a href="#" data-route="Drinks" onclick="return navigate(this)"
        ><i class="fas fa-glass"></i><span>Drinks</span></a
      >
      <a href="#" data-route="AddItem" onclick="return navigate(this)"
        ><i class="fas fa-plus"></i><span>Add Item</span></a
      >
    </nav>
  </div>
  <!--The main content will go here</div> -->
  <div id="main-content"></div>
    `;

  return { template, script };
};

module.exports = Container;
