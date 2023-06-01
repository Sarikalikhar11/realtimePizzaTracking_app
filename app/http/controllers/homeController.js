const Menu = require('../../models/menu');

function homeController() {
  //factory functions - simple function returns an object
  return {
    async index(req, res) {
      const pizzas = await Menu.find();
      console.log(pizzas);
      return res.render('home', { pizzas: pizzas });
    },
  };
}

module.exports = homeController;
