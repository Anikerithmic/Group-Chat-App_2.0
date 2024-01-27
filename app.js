require('dotenv').config();
const express = require('express');
const port = 5000;
const path = require('path');
const sequelize = require('./util/database');
const User = require('./models/User');
const Message = require('./models/Message');
const userRoute = require('./routes/userRoute');
const chatRoute = require('./routes/chatRoute');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('views'));
app.use(express.json());

app.use(userRoute);
app.use(chatRoute);


User.hasMany(Message);
Message.belongsTo(User);

sequelize
    .sync()
    .then(result => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(err => {
        console.log(err);
    });
