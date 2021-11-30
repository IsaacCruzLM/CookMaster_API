const Recipes = require('../../models/recipes');

module.exports = async (id) => (
    Recipes.getRecipeById(id)
);