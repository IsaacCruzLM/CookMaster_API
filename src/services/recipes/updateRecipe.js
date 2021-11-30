const Recipes = require('../../models/recipes');

module.exports = async (recipe) => (
    Recipes.updateRecipe(recipe)
);