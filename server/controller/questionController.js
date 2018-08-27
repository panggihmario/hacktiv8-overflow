const Question = require('../models/question')

class Controller{

    static addQuestion(req,res){
        Question.create({
            title: req.body.title,
            question: req.body.question,
            user: req.user._id
        })
        .then(dataQuestion => {
            res.status(200).json(dataQuestion)
        })
        .catch(err => {
            res.status(400).json({msg: 'create question failed',err})
        })
    }

    static getAllQuestion(req,res){
        Question.find({})
        .populate('owner')
        .populate({
            path:'answer', populate:[{path: 'owner'}]
        })
        .then(allQuestion => {
            res.status(200).json(allQuestion)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    static getOneArticle(req,res){
        Question.findOne({
            _id: req.params.id
        })
        .populate('owner')
        .populate({
            path:'answer', populate:[{path: 'owner'}]
        })
        .then(question => {
            res.status(200).json(question)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    static deleteQuestion(req,res){
        Question.deleteOne({
            _id: req.params.id
        })
        .then(delData => {
            res.status(200).json(delData)
        })
        .catch(err =>{
            res.status(400).json({msg : 'delete question failed' ,err})
        })
    }

    static UpdateQuestion(req,res){
        let {title,question} = req.body
        Question.findByIdAndUpdate({
            _id: req.params.id
        },{
            title, question
        })
        .then(updateQuestion =>{
            res.status(200).json(updateQuestion)
        })
        .catch(err => {
            res.status(400).json({msg: 'update failed',err})
        })
    }

    upVoteQuestion(req,res){
        let voterId = req.user.id
        Question.findByIdAndUpdate({
            _id: req.params.id
        },{
            $addToSet: {votersUpId : voterId},
            $pull: {votersDownId : voterId}
        })
        .then(response => {
            res.status(200).json({msg: 'upvote success'},response)
        })
        .catch(err => {
            res.status(400).json({msg: 'upvote failed'},err)
        })
    }

    downVoteQuestion(req,res){
        let voterId = req.user.id
        Question.findByIdAndUpdate({
            _id: req.params.id
        },{
            $addToSet: {votersDownId: voterId},
            $pull: {votersUpId: voterId}
        })
        .then(response => {
            res.status(200).json({msg: 'downvote success'},response)
        })
        .catch(err =>{
            res.status(400).json({msg: 'downvote failed'},err)
        })
    }

    


}

module.exports = Controller