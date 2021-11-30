const registerRecipeFunction = require('./registerRecipe');
const getAllRecipesFunction = require('./getAllRecipes');
const getRecipeByIdFunction = require('./getRecipeById');

module.exports = {
    registerRecipe: (recipe, user) => registerRecipeFunction(recipe, user),
    getAllRecipes: () => getAllRecipesFunction(),
    getRecipeById: (id) => getRecipeByIdFunction(id),
};