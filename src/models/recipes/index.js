const registerRecipeFunction = require('./registerRecipe');
const getAllRecipesFunction = require('./getAllRecipes');

module.exports = {
    registerRecipe: (recipe) => registerRecipeFunction(recipe),
    getAllRecipes: () => getAllRecipesFunction(),
};