const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
    STAI: { type: Number, required: true },
    NASA: { type: Number, required: true }
}, { _id: false });

const comment = new mongoose.Schema({
    message: { type: String, required: true  },
    name: { type: String, required: true  }
}, { _id: false, timestamps: true })

const participantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    episodes: [episodeSchema],
    comments: [comment],
});

module.exports = mongoose.model('Participant', participantSchema);
