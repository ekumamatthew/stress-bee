const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
    STAI: { type: Number, required: true },
    NASA: { type: Number, required: true }
}, { _id: false });

const participantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    episodes: [episodeSchema]
});

module.exports = mongoose.model('Participant', participantSchema);
