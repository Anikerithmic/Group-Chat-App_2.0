const path = require('path');
const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getSignup = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'signup.html'));
}

exports.postSignup = async (req, res, next) => {
    try {
        const { name, email, phone, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already in use' });
        }

        const saltrounds = 10;
        bcrypt.hash(password, saltrounds, async (err, hash) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error hashing password' });
            }

            const userData = await User.create({ name, email, phone, password: hash });
            res.status(201).json({ newUserDetails: userData, message: 'User signup successful' });
        });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.getLogin = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
}