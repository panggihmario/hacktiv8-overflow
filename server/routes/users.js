var express = require('express');
var router = express.Router();
const User = require('../controller/userController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register',User.signUp)
router.post('/login',User.SignIn)
router.post('/loginFb',User.loginFb)
router.post('/sendEmail',User.sendEmail)

module.exports = router;
