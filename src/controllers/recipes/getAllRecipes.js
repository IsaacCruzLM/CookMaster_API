const Services = require('../../services/recipes');

module.exports = async (req, res, next) => {
  try {
    const recipes = await Services.getAllRecipes();

    return res.status(200).send(recipes);
  } catch (err) {
    next(err);
  }
};