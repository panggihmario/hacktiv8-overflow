const Answer = require('../models/answer')
const Question = require('../models/question')

class Controller {

    static addAnswer(req,res){  
        Answer.create({
            answer: req.body.answer,
            owner: req.user.id
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

}

module.exports = Controller