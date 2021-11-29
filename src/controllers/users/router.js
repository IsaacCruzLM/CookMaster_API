const express = require('express');
const emailValidation = require('../../middlewares/users/emailValidate');

const router = express.Router({ mergeParams: true });

router.post('/', emailValidation, require('./registerUser'));

module.exports = router;