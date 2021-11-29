const Users = require('../../models/users');

const EMAIL_INVALID = {
    message: 'Email already registered',
};

module.exports = async (req, res, next) => {
  const { email } = req.body;

  const users = await Users.getUsers();
  const emails = users.map((user) => user.email);

  if (emails.includes(email)) return res.status(409).send(EMAIL_INVALID);

  next();
};