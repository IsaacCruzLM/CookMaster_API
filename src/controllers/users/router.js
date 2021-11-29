const express = require('express');
const emailValidation = require('../../middlewares/users/emailValidate');

const router = express.Router({ mergeParams: true });

// router.get('/', require('./getAllProducts'));
// router.get('/:id', require('./getProductById'));
router.post('/', emailValidation, require('./registerUser'));
// router.put('/:id', quantityValidation, nameValidation, require('./updateProduct'));
// router.delete('/:id', require('./removeProduct'));

module.exports = router;