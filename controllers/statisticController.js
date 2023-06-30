const statModel = require('../models/statisticsModel');

exports.getAllStats = (req,res)=>{
    statModel.getAllStats((err,stats)=>{
        if(err){
            res.send(err);
        }
        console.log('Stats:');
        console.log(stats);
        res.send(stats);
    });
};

exports.getAllStatsByQuizAndUserId = (req,res)=>{
    statModel.getAllStatsByQuizAndUserId(req.params.userId,req.params.quizId,(err,stats)=>{
        if(err){
            res.send(err);
        }
        console.log('Stats by user and quizId:');
        console.log(stats);
        res.send(stats);
    })
}

exports.getStatByUserId = (req,res)=>{
    statModel.getStatByUserID(req.params.id,(err,stats)=>{
        if(err){
            res.send(err);
        }
        console.log('Stats by userId:');
        console.log(stats);
        res.send(stats);
    });
};
exports.getMaxQuizId = (req,res)=>{
    statModel.getMaxQuizIDByUser(req.params.userId,(err,maxQuizID)=>{
        if(err){
            res.send(err);
        }
        console.log('Max quizId for user:');
        console.log(maxQuizID);
        res.send(maxQuizID);

    });
}

exports.createStat = (req,res)=>{
    const statReqData= new statModel(req.body);
    if(req.body.constructor === Object && Object.keys(req.body).length==0){
        res.send(400).send({
            succes:false,
            message:'You didnt give all fields'
        });
    }else{
        statModel.createStat(statReqData,(err,stats)=>{
            if(err){
                res.send(err);
            }else{
                res.json({
                    status:true,
                    message:'Stat created succesfully',
                    data:stats.inserId
                })
            }
        })
    }
}