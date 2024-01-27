const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send({ success: true, user });
    } catch (error) {
        res.status(400).send({success: false, error});
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user || !await bcrypt.compare(req.body.password, user.password)) {
            return res.status(401).send({ success: false, error: 'Login failed!' });
        }
        const token = jwt.sign({ _id: user._id, isAdmin: user.role === 'supervisor' }, process.env.JWT_SECRET);
        res.send({success: true, user, token });
    } catch (error) {
        res.status(400).send({success: false, error});
    }
});

module.exports = router;
