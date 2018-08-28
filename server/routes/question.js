var express = require('express');
var router = express.Router();
const Question = require('../controller/questionController')
const isAuthenticated = require('../middlewares/authentication')

/* GET users listing. */


router.post('/add',isAuthenticated,Question.addQuestion)
router.get('/allQuestion',Question.getAllQuestion)
router.get('/:id',Question.getOneQuestion)
router.put('/edit/:id',isAuthenticated,Question.UpdateQuestion)
router.delete('/delete/:id',isAuthenticated,Question.deleteQuestion)


module.exports = router;