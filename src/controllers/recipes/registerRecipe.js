const Services = require('../../services/recipes');

const BAD_REQUEST = { message: 'Invalid entries. Try again.' };

const STRING_ID = '_id';

module.exports = async (req, res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;

    if (!name || !ingredients || !preparation) return res.status(400).send(BAD_REQUEST);

    const newRecipe = await Services.registerRecipe(req.body, req.user);

    const recipe = {
      name,
      ingredients,
      preparation,
      userId: req.user[STRING_ID],
      _id: newRecipe.insertedId,
    };

    return res.status(201).send({ recipe });
  } catch (err) {
    next(err);
  }
};