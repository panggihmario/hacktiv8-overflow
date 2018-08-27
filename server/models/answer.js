var mongoose = require('mongoose')

var Schema = mongoose.Schema
var blogAnswer = new Schema({
    question: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    votersUpId: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    votersDownId: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
},{
    timestamps: true
})

var answer = mongoose.model('Answer',blogAnswer)
module.exports = answer