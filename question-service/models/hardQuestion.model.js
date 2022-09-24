const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hardQuestionSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    body: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
}, {
    timestamps: true,
});

const Question = mongoose.model('HardQuestion', hardQuestionSchema);

module.exports = Question;