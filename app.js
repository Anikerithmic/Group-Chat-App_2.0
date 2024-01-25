require('dotenv').config();
const express = require('express');
const port = 5000;
const path = require('path');
const userRoute = require('./routes/userRoute');
const sequelize = require('./util/database');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('views'));
app.use(express.json());

app.use(userRoute);


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
