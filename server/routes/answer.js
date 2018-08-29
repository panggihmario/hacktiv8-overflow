var express = require('express');
var router = express.Router();
const Answer = require('../controller/answerController')
const isAuthenticated = require('../middlewares/authentication')

router.post('/add/:id',isAuthenticated,Answer.addAnswer)
router.put('/edit/:id',isAuthenticated,Answer.editAnswer)
router.put('/upvote/:id',isAuthenticated,Answer.upVoteAnswer)
router.put('/downvote/:id',isAuthenticated,Answer.downVoteAnswer)

module.exports = router