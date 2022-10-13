const router = require('express').Router();
let EasyQuestion = require('../models/easyQuestion.model');
let MediumQuestion = require('../models/mediumQuestion.model');
let HardQuestion = require('../models/hardQuestion.model');
var seedrandom = require('seedrandom');

router.route('/getEasy').get((req, res) => {
    const { id } = req.body;
    const rng = seedrandom(id);
    EasyQuestion.find()
        .then(question => {
            const questionIndex = Math.floor(rng() * question.length)
            res.json(question[questionIndex])
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getMedium').get((req, res) => {
    const { id } = req.body;
    const rng = seedrandom(id);
    MediumQuestion.find()
        .then(question => res.json(question[Math.floor(rng() * question.length)]))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getHard').get((req, res) => {
    const { id } = req.body;
    const rng = seedrandom(id);
    HardQuestion.find()
        .then(question => {
            res.json(question[Math.floor(rng() * question.length)])
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/postEasy').post((req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const body = req.body.body;

    const newQuestion = new EasyQuestion({
        id,
        title,
        body,
    });

    newQuestion.save()
        .then(() => res.json('Question with easy difficulty added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/postMedium').post((req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const body = req.body.body;

    const newQuestion = new MediumQuestion({
        id,
        title,
        body,
    });

    newQuestion.save()
        .then(() => res.json('Question with medium difficulty added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/postHard').post((req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const body = req.body.body;

    const newQuestion = new HardQuestion({
        id,
        title,
        body,
    });

    newQuestion.save()
        .then(() => res.json('Question with hard difficulty added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;