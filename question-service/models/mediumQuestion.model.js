import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const mediumQuestionSchema = new Schema({
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

const MediumQuestion = mongoose.model('MediumQuestion', mediumQuestionSchema);

export default MediumQuestion