const Services = require('../../services/recipes');

const NOT_FOUND = { message: 'recipe not found' };

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;

    const recipe = await Services.getRecipeById(id);

    if (!recipe) return res.status(404).send(NOT_FOUND);

    return res.status(200).send(recipe);
  } catch (err) {
    next(err);
  }
};