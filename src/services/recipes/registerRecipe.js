const Recipes = require('../../models/recipes');

module.exports = async (recipe, user) => {
    const { _id } = user;
    const newRecipe = {
        ...recipe,
        userId: _id,
    };
    return Recipes.registerRecipe(newRecipe);
};