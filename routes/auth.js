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
        console.log(error)
        res.status(400).send({success: false, error});
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        console.log(req.body)
        let user = await User.findOne({ username: req.body.username }).select("+password");
        console.log(user)
        if (!user || !await bcrypt.compare(req.body.password, user.password)) {
            return res.status(401).send({ success: false, error: 'Login failed!' });
        }
        user = await User.findOne({ username: req.body.username })
        const token = jwt.sign({ _id: user._id, isAdmin: user.role === 'supervisor' }, process.env.JWT_SECRET);
        res.send({success: true, user, token });
    } catch (error) {
        console.log(error)
        res.status(400).send({success: false, error});
    }
});

module.exports = router;
