const Services = require('../../services/users');

const BAD_REQUEST = { message: 'Invalid entries. Try again.' };

// Regex retirado do cógido no link: <https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/>
const validateEmail = (email) => {
  const emailRegexp = /\S+@\S+\.\S+/;
  return emailRegexp.test(email);
};

module.exports = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !password || !validateEmail(email)) return res.status(400).send(BAD_REQUEST);

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