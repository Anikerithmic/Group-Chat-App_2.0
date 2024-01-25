const express = require('express');
const chatController = require('../controllers/chatController');

const router = express.Router();

router.get('/chat', chatController.getChat);

module.exports = router;