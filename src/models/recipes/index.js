const registerRecipeFunction = require('./registerRecipe');
const getAllRecipesFunction = require('./getAllRecipes');
const getRecipeByIdFunction = require('./getRecipeById');
const updateRecipeFunction = require('./updateRecipe');
const deleteRecipeFunction = require('./deleteRecipe');

module.exports = {
    registerRecipe: (recipe) => registerRecipeFunction(recipe),
    getAllRecipes: () => getAllRecipesFunction(),
    getRecipeById: (id) => getRecipeByIdFunction(id),
    updateRecipe: (recipe) => updateRecipeFunction(recipe),
    deleteRecipe: (id) => deleteRecipeFunction(id),
};