var express = require('express');
var router = express.Router();
const Answer = require('../controller/answerController')
const isAuthenticated = require('../middlewares/authentication')

router.post('/add/:id',isAuthenticated,Answer.addAnswer)
router.put('/edit/:id',isAuthenticated,Answer.editAnswer)

module.exports = router