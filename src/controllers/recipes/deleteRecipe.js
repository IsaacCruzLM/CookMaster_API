const Services = require('../../services/recipes');

const NOT_FOUND = { message: 'recipe not found' };
const INVALID_PERMISSION = { message: 'You dont have permission' };

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id, role } = req.user;

    const recipe = await Services.getRecipeById(id);

    if (!recipe) return res.status(404).send(NOT_FOUND);

    if (_id !== recipe.userId 
        && role !== 'admin') return res.status(403).send(INVALID_PERMISSION);

    await Services.deleteRecipe(id);
    
    return res.status(204).end();
  } catch (err) {
    next(err);
  }
};