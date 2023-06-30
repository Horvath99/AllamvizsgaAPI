const scoreModel = require('../models/scoreModel');

exports.getScoreList = (req,res) =>{
    scoreModel.getAllScores((err,scores)=>{
        if(err){
            res.send(err);
        }else{
            res.send(scores);
        }
    })
}
//get score by playeid
exports.getScoreById = (req,res) =>{
    scoreModel.getScoreByPlayerId(req.params.id,(err,scores)=>{
        if(err){
            res.send(err);
            console.log('Score by id');
        }else{
            res.send(scores);
        }
    })
}
//get score by room id
exports.getScoreByRoom = (req,res) =>{
    scoreModel.getScoreByRoomId(req.params.id,(err,score)=>{
        if(err){
            res.send(err)
        }else{
            res.send(score)
        }
    })
}
//create score
exports.createScore = (req,res)=>{
    const scoreReqData = new scoreModel(req.body);
    
    if(req.body.constructor === Object && Object.keys(req.body).length==0){
        res.send(400).send({succes:false,message:'Please fill all fields'});
    
    }else{

        scoreModel.createScore(scoreReqData,(err,score)=>{
            if(err){
                res.send(err);
            }
            res.json({status:true,message:'Score Created succesfully',data:score.insertId})
        })
    }
}

exports.updateScore = (req,res) =>{
    const scoreReqData = new scoreModel(req.body);
    console.log('scoreReqData update',scoreReqData);
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({succes: false,message:'Please fill all fields'});
    }
    else{
        scoreModel.updateScore(req.params.score1,req.params.score2,req.params.roomId,(err,score)=>{
            if(err){
                res.send(err)
                
            }
            res.json({status:true,message:'Question updated succesfully'})
        })
    }
}