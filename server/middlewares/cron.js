var CronJob = require('cron').CronJob;
const nodemailer = require('nodemailer');
const User = require('../models/user')

function cron(){
    new CronJob('11 10 11 * * 5', function() {
        jumatAlert()
      }, null, true, 'America/Los_Angeles');
}

function jumatAlert(req,res){
    User.find()
    .then(allUser =>{
        console.log(allUser[0].email)
        allUser.forEach(user => {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: process.env.email,
                  pass: process.env.passEmail
                }
              });
            var mailOptions = {
                from: process.env.email,
                to: user.email,
                subject: 'Registration overflow',
                text: 'Welcome to my overflow'
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                console.log(error);
                } else {
                console.log('Email sent: ' + info.response);
                }
            });
        })
    })

}

module.exports  = cron