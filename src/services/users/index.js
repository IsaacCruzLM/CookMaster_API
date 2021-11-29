const registerUserFunction = require('./registerUser');
const findUserFunction = require('./findUser');

module.exports = {
    registerUser: (user) => registerUserFunction(user),
    findUser: (user) => findUserFunction(user),
};