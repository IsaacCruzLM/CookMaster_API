const connection = require('../connection');

module.exports = async (recipe) => {
  const { _id, ...recipeWithoutId } = recipe;

  await (await connection()).collection('recipes').updateOne(
    { _id },
    {
      $set: recipeWithoutId,
    },
  );

  return recipe;
};