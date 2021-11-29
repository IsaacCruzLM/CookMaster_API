const Users = require('../../models/users');

module.exports = async (recipe, user) => {
    const { _id } = user;
    const newRecipe = {
        ...recipe,
        userId: _id,
    };
    return Users.registerUser(newRecipe);
};