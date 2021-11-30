const { ObjectId } = require('mongodb');
const connection = require('../connection');

module.exports = async (id) => (
    ObjectId.isValid(id)
    ? (await connection()).collection('recipes').findOne(ObjectId(id))
    : null
);