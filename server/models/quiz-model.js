const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Quiz = new Schema(
    {
        questionSet: { type: String, required: true },
        question: { type: String, required: true },
        option1: { type: String, required: true },
        option2: { type: String, required: true },
        option3: { type: String, required: true },
        option4: { type: String, required: true },
        answer: { type: String, required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model('quizzes', Quiz);
