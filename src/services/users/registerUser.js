const Users = require('../../models/users');

module.exports = async (user) => {
    const { name, email, password } = user;
    const newUser = {
        name,
        email,
        password,
        role: 'user',
    };
    return Users.registerUser(newUser);
};