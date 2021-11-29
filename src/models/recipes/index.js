const registerRecipeFunction = require('./registerRecipe');

module.exports = {
    registerRecipe: (recipe) => registerRecipeFunction(recipe),
};