const Services = require('../../services/users');

const BAD_REQUEST = { message: 'Invalid entries. Try again' };

module.exports = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) return res.status(400).send(BAD_REQUEST);

    const newUser = await Services.registerUser(req.body);

    const user = {
        name,
        email,
        role: 'user',
        _id: newUser.insertedId,
    };

    return res.status(201).send({ user });
  } catch (err) {
    next(err);
  }
};