const Answer = reqjuire('/models/answer')
const Question = require('/models/question')

class Controller {

    static addAnswer(req,res){
        Answer.create({
            question: req.body.question,
            owner: req.user.id
        })
        .then(response => {
            Question.findByIdAndUpdate({
                _id: req.params.id
            },{
                $push: {answer: response._id}
            })
            .then(responseQuestion => {
                res.status(200).json(response)
            })
            .catch(err => {
                res.status(400).json(err)
            })
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

}

module.exports = Controller