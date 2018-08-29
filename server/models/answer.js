var mongoose = require('mongoose')

var Schema = mongoose.Schema
var blogAnswer = new Schema({
    answer: {
        type: String,
        required: true
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    votersUpId: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    votersDownId: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    vote: {
        type: Number,
        default: 0
    }
},{
    timestamps: true
})

var answers = mongoose.model('Answer',blogAnswer)
module.exports = answers