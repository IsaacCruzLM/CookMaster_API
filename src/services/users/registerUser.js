const Users = require('../../models/users');

module.exports = async (user) => {
    const { name, email } = user;
    const newUser = {
        name,
        email,
        role: 'user',
    };
    return Users.registerUser(newUser);
};