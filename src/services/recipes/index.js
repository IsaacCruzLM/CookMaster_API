const registerRecipeFunction = require('./registerRecipe');

module.exports = {
    registerRecipe: (recipe, user) => registerRecipeFunction(recipe, user),
};