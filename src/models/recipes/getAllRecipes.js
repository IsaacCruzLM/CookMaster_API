const connection = require('../connection');

module.exports = async () => ((await connection())
  .collection('recipes').find({}).toArray()
);