const connection = require('../connection');

module.exports = async (recipe) => ((await connection())
  .collection('recipes').insertOne(recipe));