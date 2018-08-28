var mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const saltRound = 10
const emailValidator = function(email) {
    return /^\w([.!#$%&’*+/=?^_`{|}~-]*?\w+)+@\w+(\.\w{2,3})+$/.test(email);
  };

var Schema = mongoose.Schema
var blogUser = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: [emailValidator,'Email is invalid']
    },
    password: {
        type: String,
        required: true,
        minlength : [6, 'Password minimun 6 character']
    }
})

blogUser.pre('save', function (next) {
    let user = this;
    //only hash the password if it has been modifed or is new
    if (!user.isModified('password')) return next();

    //generate salt
    bcrypt.hash(user.password, saltRound, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });

})

var user = mongoose.model('User',blogUser)
module.exports = user