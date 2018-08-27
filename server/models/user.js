var mongoose = require('mongoose')

const emailValidator = function(email) {
    return /^\w([.!#$%&’*+/=?^_`{|}~-]*?\w+)+@\w+(\.\w{2,3})+$/.test(email);
  };

var Schema = mongoose.Schema
var blogUser = new Schema({
    name: {
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
        required: true
    }
})

var user = mongoose.model('User',blogUser)
module.exports = user