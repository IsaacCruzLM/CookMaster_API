const registerUserFunction = require('./registerUser');
const getUsersFunction = require('./getUsers');

module.exports = {
    registerUser: (user) => registerUserFunction(user),
    getUsers: () => getUsersFunction(),
};