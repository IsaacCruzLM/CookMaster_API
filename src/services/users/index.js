const registerUserFunction = require('./registerUser');

module.exports = {
    registerUser: (user) => registerUserFunction(user),
};