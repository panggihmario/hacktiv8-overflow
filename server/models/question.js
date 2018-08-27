var mongoose = require('mongoose')

var Schema = mongoose.Schema
var blogQuestion = new Schema({
    title: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    answer: [{
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    }],
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

var question = mongoose.model('Question',blogQuestion)
module.exports = question