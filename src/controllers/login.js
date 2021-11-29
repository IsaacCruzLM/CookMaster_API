const Services = require('../services/users');

const BAD_REQUEST = { message: 'All fields must be filled' };
const WRONG_USER = { message: 'Incorrect username or password' };

module.exports = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(401).send(BAD_REQUEST);

    const loginResult = await Services.findUser(req.body);

    if (!loginResult) return res.status(401).send(WRONG_USER);

    return res.status(200).send(loginResult);
  } catch (err) {
    next(err);
  }
};