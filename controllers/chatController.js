const path = require('path');

exports.getChat = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'chat.html'));
}
