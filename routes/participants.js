const express = require('express');
const jwt = require('jsonwebtoken');
const Participant = require('../models/participant');
const router = express.Router();

// Middleware to authenticate supervisor
const adminAuth = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.isAdmin) {
            throw new Error();
        }
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please login as admin.' });
    }
};

// Middleware to authenticate users
const userAuth = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please login.' });
    }
};


// Get all participants
router.get('/', userAuth, async (req, res) => {
    try {
        const participants = await Participant.find({});
        res.send(participants);
    } catch (error) {
        res.status(500).send(error);
    }
});


// Add participant (Admin only)
router.post('/', adminAuth, async (req, res) => {
    try {
        const participant = new Participant(req.body);
        await participant.save();
        res.status(201).send(participant);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Add episode data to a participant (Admin only)
router.post('/:id/episodes', adminAuth, async (req, res) => {
    try {
        const participant = await Participant.findById(req.params.id);
        if (!participant) {
            return res.status(404).send();
        }
        participant.episodes.push(req.body);
        await participant.save();
        res.send(participant);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
