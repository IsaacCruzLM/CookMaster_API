const express = require('express');
const auth = require('../../middlewares/recipes/auth');
const upload = require('../../middlewares/recipes/upload');

const router = express.Router({ mergeParams: true });

router.get('/', require('./getAllRecipes'));
router.get('/:id', require('./getRecipeById'));
router.post('/', auth, require('./registerRecipe'));
router.put('/:id', auth, require('./updateRecipe'));
router.delete('/:id', auth, require('./deleteRecipe'));
router.put('/:id/image', auth, upload.single('image'), require('./uploadImage'));

module.exports = router;