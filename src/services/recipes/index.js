const registerRecipeFunction = require('./registerRecipe');
const getAllRecipesFunction = require('./getAllRecipes');

module.exports = {
    registerRecipe: (recipe, user) => registerRecipeFunction(recipe, user),
    getAllRecipes: () => getAllRecipesFunction(),
};