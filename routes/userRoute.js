const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/signup', userController.getSignup);
router.post('/signup', userController.postSignup);
router.get('/login', userController.getLogin)

module.exports = router;
