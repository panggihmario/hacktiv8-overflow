const jwt = require('jsonwebtoken')
const User = require('../models/user')

function authentication(req,res,next){
    console.log('masuk auth')
    let decoded = jwt.verify(req.headers.authorization,'easy')
    if(decoded){
        User.findOne({
            _id: decoded.id
        })
        .then(dataUser => {
            if(dataUser){
                req.user = dataUser
                console.log('ini dari token======',req.user)
                next()
            }else{
                res.status(400).send({ msg:'user doesnt exist'})
            }
        })
        .catch(err =>{
            res.status(400).json(err)
        })
    }else{
        res.status(400).send({msg :'invalid token'})
    }
}

module.exports = authentication