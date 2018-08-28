const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

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

}

module.exports = Controller