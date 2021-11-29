// Algoritimo retirado do repositóris das aulas ao vivo, live lecture 27.1
const jwt = require('jsonwebtoken');

const API_SECRET = 'senhasecreta123';

const JWT_CONFIG = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const genToken = (data) => jwt.sign({ data }, API_SECRET, JWT_CONFIG);

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, API_SECRET);

    return decoded.data;
  } catch (err) {
    return null;
  }
};

module.exports = {
  genToken,
  verifyToken,
};