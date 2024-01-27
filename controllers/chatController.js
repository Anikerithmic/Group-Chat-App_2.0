const path = require('path');
const User = require('../models/User');
const Message = require('../models/Message');

exports.getChat = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'chat.html'));
}

exports.createMessage = async (req, res, next) => {
    try {
        const { message } = req.body;

        const messageData = await Message.create({
            userId: req.user.id,
            message: message

        });
        if (!messageData) {
            throw new Error('Failed to create new message.');
        }

        res.status(201).json({ newMessage: messageData });

    } catch (err) {

        console.log('Error creating message:', err)
        return res.status(500).json({ error: err });
    };
}
exports.getMessage = async (req, res, next) => {
    try {
        const messages = await Message.findAll({where: {userId: req.user.id}});
        if (messages.length === 0) {
           return res.json('');
        }
        res.json(messages);

    } catch (err) {
        console.error('Error fetching messages:', err);
        res.status(500).json({ error: err.message });
    }
};

