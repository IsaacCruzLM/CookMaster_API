const Users = require('../../models/users');
const authService = require('../auth');

module.exports = async (user) => {
    const { email, password } = user;
    
    const userFound = await Users.getUserByEmail(email);

    if (!userFound || userFound.password !== password) return false;

    const { password: _password, ...userWithoutPassword } = userFound;

    const token = authService.genToken(userWithoutPassword);

    return ({ token });
};