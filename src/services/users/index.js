const registerUserFunction = require('./registerUser');
const findUserFunction = require('./findUser');
const registerAdminFunction = require('./registerAdmin');

module.exports = {
    registerUser: (user) => registerUserFunction(user),
    findUser: (user) => findUserFunction(user),
    registerAdmin: (user) => registerAdminFunction(user),
};