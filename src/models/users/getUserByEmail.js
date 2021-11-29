const connection = require('../connection');

module.exports = async (email) => ((await connection())
  .collection('users').findOne({ email })
);