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
                    name
                })
            }
        })
    }

}