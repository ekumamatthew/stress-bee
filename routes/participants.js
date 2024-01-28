const express = require('express');
const jwt = require('jsonwebtoken');
const Participant = require('../models/participant');
const router = express.Router();

// Middleware to authenticate supervisor
const adminAuth = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded)
        if (!decoded.isAdmin) {
            throw new Error();
        }
        next();
    } catch (error) {
        console.log("we have an error")
        res.status(401).send({ success: false, error: 'Please login as admin.' });
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
        console.log("we hane an error")
        console.error(error)
        res.status(401).send({ success: false, error: 'Please login.' });
    }
};


// Get all participants
router.get('/', userAuth, async (req, res) => {
    try {
        const participants = await Participant.find({});
        res.send({ success: true, data: participants });
    } catch (error) {
        console.error(error)
        res.status(500).send({ success: false, error });
    }
});


// Add participant (Admin only)
router.post('/', adminAuth, async (req, res) => {
    try {
        const participant = new Participant(req.body);
        await participant.save();
        res.status(201).send({ success: true, data: participant, message: "Participant created successfuly" });
    } catch (error) {
        console.error(error)
        res.status(400).send({ success: false, error });
    }
});

// Add episode data to a participant (Admin only)
router.post('/:id/episodes', adminAuth, async (req, res) => {
    try {
        const participant = await Participant.findById(req.params.id);
        if (!participant) {
            return res.status(404).send({ success: false, error: "Perticipant not found" });
        }
        const { STAI, NASA } = req.body;
        participant.episodes.push({ STAI, NASA });
        await participant.save();
        res.send({ success: true, data: participant, message: "participant updated succesfully" });
    } catch (error) {
        console.error(error)
        res.status(400).send({ success: false, error });
    }
});

// Add episode data to a participant (Admin only)
router.get('/:id', adminAuth, async (req, res) => {
    try {
        const participant = await Participant.findById(req.params.id);
        if (!participant) {
            return res.status(404).send({ success: false, error: "Perticipant not found" });
        }
        res.send({ success: true, data: participant, message: "participant found" });
    } catch (error) {
        console.error(error)
        res.status(400).send({ success: false, error });
    }
});


// Add episode data to a participant (Admin only)
router.delete('/:id', adminAuth, async (req, res) => {
    try {
        const participant = await Participant.findByIdAndDelete(req.params.id);

        res.send({ success: true, message: "participant deleted" });
    } catch (error) {
        console.error(error)
        res.status(400).send({ success: false, error });
    }
});


module.exports = router;
