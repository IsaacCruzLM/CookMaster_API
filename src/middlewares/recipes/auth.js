// Algoritimo retirado do repositóris das aulas ao vivo, live lecture 27.1
const authService = require('../../services/auth');

const WITHOUT_JWT = { message: 'user not logged in' };
const INVALID_JWT = { message: 'jwt malformed' };

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).send(WITHOUT_JWT);
    }

    const user = authService.verifyToken(authorization);
    if (!user) {
      return res.status(401).send(INVALID_JWT);
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(500).end();
  }
};