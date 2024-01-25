require('dotenv').config();
const express = require('express');
const port = 5000;
const path = require('path');
const sequelize = require('./util/database');
const userRoute = require('./routes/userRoute');
const chatRoute = require('./routes/chatRoute');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('views'));
app.use(express.json());

app.use(userRoute);
app.use(chatRoute);


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
