const Recipes = require('../../models/recipes');

module.exports = async (service) => (
    Recipes.updateRecipe(service)
);