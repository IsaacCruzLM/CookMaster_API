const express = require('express');
const auth = require('../../middlewares/recipes/auth');

const router = express.Router({ mergeParams: true });

router.get('/', require('./getAllRecipes'));
router.get('/:id', require('./getRecipeById'));
router.post('/', auth, require('./registerRecipe'));
// router.put('/:id', quantityValidation, nameValidation, require('./updateProduct'));
// router.delete('/:id', require('./removeProduct'));

module.exports = router;