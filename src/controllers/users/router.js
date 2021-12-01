const express = require('express');
const emailValidation = require('../../middlewares/users/emailValidate');
const auth = require('../../middlewares/recipes/auth');

const router = express.Router({ mergeParams: true });

router.post('/', emailValidation, require('./registerUser'));
router.post('/admin', emailValidation, auth, require('./registerAdmin'));

module.exports = router;