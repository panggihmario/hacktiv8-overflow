var express = require('express');
var router = express.Router();
const Question = require('../controller/questionController')
const isAuthenticated = require('../middlewares/authentication')

/* GET users listing. */


router.post('/add',isAuthenticated,Question.addQuestion)


module.exports = router;