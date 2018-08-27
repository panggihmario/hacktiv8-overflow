const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const saltRound = 10

class Controller{

    static signUp(req,res){
        var salt = bcrypt.genSaltSync(saltRound)
        var hash = bcrypt.hashSync(req.body.password, salt)
        User.findOne({
            email: req.body.email
        })
        .then(data=>{
            if(!data){
                User.create({
                    name : req.body.name,
                    email: req.body.email,
                    password: hash
                })
                .then(dataUser=>{
                    res.status(200).json(dataUser)
                })
                .catch(err=>{
                    res.status(400).json(err)
                })
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

}

module.exports = Controller