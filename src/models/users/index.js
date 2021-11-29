const registerUserFunction = require('./registerUser');
const getUsersFunction = require('./getUsers');
const getUserByEmailFunction = require('./getUserByEmail');

module.exports = {
    registerUser: (user) => registerUserFunction(user),
    getUsers: () => getUsersFunction(),
    getUserByEmail: (email) => getUserByEmailFunction(email),
};