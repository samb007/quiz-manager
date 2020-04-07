const Quiz = require('../models/quiz-model');

const createQuiz = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a quiz'
        });
    }

    const quiz = new Quiz(body);

    if (!quiz) {
        return res.status(400).json({ success: false, error: res.err });
    }

    quiz.save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: quiz._id,
                message: 'Quiz created!'
            });
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Quiz not created!'
            });
        });
};

const updateQuiz = async (req, res) => {
    const body = req.body;
    console.log(body);

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update'
        });
    }

    Quiz.findOne({ _id: req.params.id }, (err, quiz) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Quiz not found!'
            });
        }
        quiz.questionSet = body.questionSet;
        quiz.question = body.question;
        quiz.option1 = body.option1;
        quiz.option2 = body.option2;
        quiz.option3 = body.option3;
        quiz.option4 = body.option4;
        quiz.answer = body.answer;
        quiz.save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: quiz._id,
                    message: 'Quiz updated!'
                });
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Quiz not updated!'
                });
            });
    });
};

const deleteQuiz = async (req, res) => {
    await Quiz.findOneAndDelete({ _id: req.params.id }, (err, quiz) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!quiz) {
            return res
                .status(404)
                .json({ success: false, error: `Quiz not found` });
        }

        return res.status(200).json({ success: true, data: quiz });
    }).catch(err => console.log(err));
};

const getQuizById = async (req, res) => {
    await Quiz.findOne({ _id: req.params.id }, (err, quiz) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!quiz) {
            return res
                .status(404)
                .json({ success: false, error: `Quiz not found` });
        }
        return res.status(200).json({ success: true, data: quiz });
    }).catch(err => console.log(err));
};

const getQuizzes = async (req, res) => {
    await Quiz.find({}, (err, quizzes) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!quizzes.length) {
            return res
                .status(404)
                .json({ success: false, error: `Quiz not found` });
        }
        return res.status(200).json({ success: true, data: quizzes });
    }).catch(err => console.log(err));
};

module.exports = {
    createQuiz,
    updateQuiz,
    deleteQuiz,
    getQuizzes,
    getQuizById
};
