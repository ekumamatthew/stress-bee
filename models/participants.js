const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
    STAI: Number,
    NASA: Number
}, { _id: false });

const participantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    episodes: [episodeSchema]
});

module.exports = mongoose.model('Participant', participantSchema);
