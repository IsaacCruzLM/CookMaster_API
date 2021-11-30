const registerRecipeFunction = require('./registerRecipe');
const getAllRecipesFunction = require('./getAllRecipes');
const gerRecipeByIdFunction = require('./gerRecipeById');

module.exports = {
    registerRecipe: (recipe) => registerRecipeFunction(recipe),
    getAllRecipes: () => getAllRecipesFunction(),
    gerRecipeById: (id) => gerRecipeByIdFunction(id),
};