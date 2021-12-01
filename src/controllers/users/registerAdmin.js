const Services = require('../../services/users');

const BAD_REQUEST = { message: 'Invalid entries. Try again.' };

const INVALID_PERMISSION = { message: 'Only admins can register new admins' };

// Regex retirado do cógido no link: <https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/>
const validateEmail = (email) => {
  const emailRegexp = /\S+@\S+\.\S+/;
  return emailRegexp.test(email);
};

const validateEntries = (name, password, email) => {
  if (!name || !password || !validateEmail(email)) return true;
  return false;
};

const validateRole = (role) => role !== 'admin';

module.exports = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (validateEntries(name, password, email)) return res.status(400).send(BAD_REQUEST);

    if (validateRole(req.user.role)) return res.status(403).send(INVALID_PERMISSION);

    const newUser = await Services.registerAdmin(req.body);

    const user = {
      name,
      email,
      role: 'admin',
      _id: newUser.insertedId,
    };

    return res.status(201).send({ user });
  } catch (err) {
    next(err);
  }
};