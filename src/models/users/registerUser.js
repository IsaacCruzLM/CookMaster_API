const connection = require('../connection');

module.exports = async (user) => ((await connection())
  .collection('users').insertOne(user));