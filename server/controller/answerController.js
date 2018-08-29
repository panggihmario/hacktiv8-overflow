const Answer = require('../models/answer')
const Question = require('../models/question')

class Controller {

    static addAnswer(req,res){  
        Answer.create({
            answer: req.body.answer,
            owner: req.user.id,
            question: req.params.id,
        })
        .then(response => {
            Question.findByIdAndUpdate({
                _id: req.params.id
            },{
                $push: {answer: response._id}
            })
            .then(responseQuestion => {
                res.status(200).json(responseQuestion)
            })
            .catch(err => {
                res.status(400).json(err)
            })
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    static editAnswer(req,res){
        let user = req.user
        Answer.findOne({
            _id: req.params.id
        })
        .then(data =>{
            if(String(data.owner)== String(user._id)){
                console.log('lolos')
                console.log(req.body)
                Answer.findByIdAndUpdate({
                    _id: req.params.id
                },{
                    answer: req.body.answer
                })
                .then(response => {
                    console.log(response)
                    res.status(200).json(response)
                })
                .catch(err => {
                    res.status(400).json({msg:'failed edit answer',err})
                })
            }else{
                res.status(400).json({msg: 'you are not authorized'})
            }
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    }
    
    static upVoteAnswer(req,res){
        let voterId = req.user._id
        Answer.findOne({
            _id: req.params.id
        })
        .then(data => {
            if(String(data.owner) !== String(voterId)){
                console.log('lolos')
                Answer.findOne({
                    _id: req.params.id,
                    votersUpId: {$in:voterId}
                })
                .then(checkVote => {
                    if(checkVote) {
                        res.status(400).json({msg:'you have voted this answer'})
                    }else{
                        Answer.findByIdAndUpdate({
                            _id: req.params.id
                        },{
                            $addToSet: {votersUpId : voterId},
                            $pull: {votersDownId: voterId},
                            $inc: {vote :1}
                        })
                        .then(response =>{
                            res.status(200).json({msg:'upvote answer success',response})
                        })
                        .catch(err => {
                            console.log("ini err upvote",err)
                            res.status(400).json({msg: 'upvote failed',err})
                        })
                    }
                })
            }else{
                res.status(400).json({msg: 'you cant upvote on your answer'})
            }
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    static downVoteAnswer(req,res){
        let voterId = req.user._id
        Answer.findOne({
            _id: req.params.id
        })
        .then(data => {
            if(String(data.owner) !== String(voterId)){
                console.log('lolos')
                Answer.findOne({
                    _id: req.params.id,
                    votersDownId: {$in:voterId}
                })
                .then(checkVote => {
                    if(checkVote){
                        res.status(400).json({msg: 'you have voted this answer'})
                    }else{
                        Answer.findByIdAndUpdate({
                            _id: req.params.id
                        },{
                            $addToSet: {votersDownId : voterId},
                            $pull: {votersUpId: voterId},
                            $inc: {vote :-1}
                        })
                        .then(response =>{
                            res.status(200).json({msg:'downvote answer success',response})
                        })
                        .catch(err => {
                            console.log("ini err upvote",err)
                            res.status(400).json({msg: 'downvote failed',err})
                        })
                    }
                })
                
            }else{
                res.status(400).json({msg: 'you cant downvote on your answer'})
            }
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }



}

module.exports = Controller