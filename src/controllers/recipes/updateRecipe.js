const Services = require('../../services/recipes');

// const NOT_FOUND = { message: 'recipe not found' };
const BAD_REQUEST = { message: 'Invalid entries. Try again.' };
const INVALID_PERMISSION = { message: 'You dont have permission' };

const verifyBody = (body) => {
    const { name, ingredients, preparation } = body;

    if (!name || !ingredients || !preparation) return true;

    return false;
};

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id, role } = req.user;
    
    if (verifyBody(req.body)) return res.status(400).send(BAD_REQUEST);

    const recipe = await Services.getRecipeById(id);

    // if (!recipe) return res.status(404).send(NOT_FOUND);

    if (_id !== recipe.userId 
        && role !== 'admin') return res.status(403).send(INVALID_PERMISSION);

    const updatedRecipe = await Services.updateRecipe({ ...recipe, ...req.body });
    
    return res.status(200).send(updatedRecipe);
  } catch (err) {
    next(err);
  }
};