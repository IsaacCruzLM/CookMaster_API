const Recipes = require('../../models/recipes');

module.exports = async () => (
    Recipes.getAllRecipes()
);