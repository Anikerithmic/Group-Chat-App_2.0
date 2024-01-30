const express = require('express');
const chatController = require('../controllers/chatController');
const userAuthentication = require('../middleware/auth');

const router = express.Router();

router.get('/chat', chatController.getChat);
router.post('/message', userAuthentication.authenticate, chatController.createMessage);
router.get('/chat/message', userAuthentication.authenticate, chatController.getMessage);
router.get('/chat/newMessages', userAuthentication.authenticate, chatController.getNewMessages);

module.exports = router;