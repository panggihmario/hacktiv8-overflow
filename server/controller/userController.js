const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const axios = require('axios')
const nodemailer = require('nodemailer');

class Controller{

    static signUp(req,res){
        User.findOne({
            email: req.body.email
        })
        .then(data=>{
            if(!data){
                User.create({
                    username : req.body.username,
                    email: req.body.email,
                    password: req.body.password
                })
                .then(dataUser=>{
                    res.status(200).json(dataUser)
                })
                .catch(err=>{
                    res.status(400).json({msg: err.message})
                })
            }else{
                res.status(400).json({msg: 'email has already taken'})
            }
        })
        .catch(err=>{
            res.status(400).json({msg: 'email has already taken'})
        })
    }

    static SignIn(req,res){
        User.findOne({
            email: req.body.email
        })
        .then(login=>{
            if(login){
                let checkPassword = bcrypt.compareSync(req.body.password,login.password)
                if(checkPassword){
                    var authorization = jwt.sign({
                        id: login._id,
                        name: login.name,
                        email: login.email
                    },'easy')
                    res.status(200).json({authorization,login})
                }else{
                    res.status(400).json({msg: 'invalid password'})
                }
            }else{
                res.status(400).json({msg: 'email doesnt exist'})
            }
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    }

    static loginFb(req,res){
        console.log('masuk sini gk')
        let token = req.body.data.fbToken
        let url = `https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`
        axios.get(url)
        .then(data =>{
            User.findOne({
                email: data.data.email
            })
            .then(dataFb => {
                console.log(dataFb)
                if(!dataFb){
                    User.create({
                        username: data.data.name,
                        email: data.data.email,
                        password: data.data.id
                    })
                    .then(response => {
                        console.log(response)
                        var authorization = jwt.sign({
                            id:response._id,
                            name: response.name,
                            email: response.email
                        },'easy')
                        res.status(200).json({authorization,response})
                    })
                    .catch(err => {
                        res.status(400).json(err)
                    })
                }else{
                    console.log('masuk else nih')
                    var authorization = jwt.sign({
                        id:dataFb._id,
                        name: dataFb.name,
                        email: dataFb.email
                    },'easy')
                    res.status(200).json({authorization,dataFb})
                }
            })
            .catch(err =>{
                res.status(400).json(err)
            })
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    static sendEmail(req,res){
        console.log(req.body)
        console.log('masuk send Email nih')
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.email,
              pass: process.env.passEmail
            }
          });
          
        var mailOptions = {
            from: process.env.email,
            to: req.body.email,
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
    }

}

module.exports = Controller