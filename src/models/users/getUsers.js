const connection = require('../connection');

module.exports = async () => ((await connection())
  .collection('users').find({}).toArray()
);