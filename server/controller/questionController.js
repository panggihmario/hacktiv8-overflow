const Question = require('../models/question')
const Answer = require('../models/answer');
class Controller{

    static addQuestion(req,res){
        Question.create({
            title: req.body.title,
            question: req.body.question,
            owner: req.user._id
        })
        .then(dataQuestion => {
            res.status(200).json({msg:'create question success',dataQuestion})
        })
        .catch(err => {
            res.status(400).json({msg: 'create question failed',err})
        })
    }

    static getAllQuestion(req,res){
        Question.find()
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

    static getOneQuestion(req,res){
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
        let user = req.user
        Question.findOne({
            _id: req.params.id
        })
        .then(data => {
            if(String(data.owner) == String(user._id)){
                Question.deleteOne({
                    _id: req.params.id
                })
                .then(delData => {
                    res.status(200).json(delData)
                })
                .catch(err =>{
                    res.status(400).json({msg : 'delete question failed' ,err})
                })
            }else{
                res.status(400).json({msg: 'you are not authorized'})
            }
        })
        
    }

    static UpdateQuestion(req,res){
        let user = req.user
        Question.findOne({
            _id: req.params.id
        })
        .then(data => {
            if(String(data.owner) == String(user._id)){
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
            }else{
                res.status(400).json({msg: 'you are not authorized'})
            }
        })
        .catch(err => {
            res.status(400).json(err)
        })
     
    }

    static upVoteQuestion(req,res){
        let voterId = req.user._id
        Question.findOne({
            _id: req.params.id
        })
        .then(data => {
            if(String(data.owner) !== String(req.user._id)){
                Question.findByIdAndUpdate({
                    _id: req.params.id
                },{
                    $addToSet: {votersUpId : voterId},
                    $pull: {votersDownId : voterId}
                })
                .then(response => {
                    res.status(201).json({msg:'upvote success',response})
                })
                .catch(err => {
                    res.status(400).json({msg: 'upvote failed',err})
                })
            }else{
                res.status(400).json({msg:'you cant upvote on your question'})
            }
        })
        .catch(err => {
            res.json(err)
        })
        
    }

    static downVoteQuestion(req,res){
        let voterId = req.user._id
        console.log(voterId)
        console.log("ini req user controller",req.user)
        console.log(voterId)
        Question.findOne({
            _id: req.params.id
        })
        .then(data => {
            if(String(data.owner) !== String(req.user._id)){
                Question.update({
                    _id: req.params.id
                },{
                    $addToSet: {votersDownId : voterId},
                    $pull: {votersUpId : voterId}
                })
                .then(response => {
                    console.log(response)
                    res.status(200).json({msg: 'downvote success',response})
                })
                .catch(err => {
                    res.status(400).json({msg: 'downvote failed',err})
                })
            }else{
                res.status(400).json({msg:'you cant downvote on your question'})
            }
        })
        .catch(err => {
            res.json(err)
        })
    }

}

module.exports = Controller