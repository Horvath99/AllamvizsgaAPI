const quizResultsModel = require('../models/quizResultsModel');

//get all results
exports.getAllResults = (req,res) =>{
    quizResultsModel.getAllResults((err,results)=>{
        if(err){
            res.send(err);
        }
        console.log('Results:');
        console.log(results);
        res.send(results);
    })
};
exports.getAllResultsAdmin = (req,res) =>{
    quizResultsModel.getAllResultsAdmin((err,results)=>{
        if(err){
            res.send(err);
        }else{
            res.send({success:true,data:results});
        }
    })
}
exports.getRecentResults = (req,res)=>{
    quizResultsModel.getRecentResults((err,results)=>{
        if(err){
            res.send(err);
            console.log('Error while getting stat of user');
        }
        console.log('Succesfully fetched resuls of user');
        console.log(results);
        res.send(results);
    })
}
//get all results of a user
exports.getResultOfUser = (req,res) =>{
    quizResultsModel.getResultsOfUser(req.params.userId,(err,results)=>{
        if(err){
            res.send(err);
            console.log('Error while getting stat of user');
        }
        console.log('Succesfully fetched resuls of user');
        console.log(results);
        res.send(results);
    })
}

//leaderboard results
exports.getAllLeaderboardResults = (req,res)=>{
    quizResultsModel.getLeaderboardResults((err,results)=>{
        if(err){
            res.send(err)
            
        }else{
            res.send(results)
        }
    })
}

//createResult
exports.createResult = (req,res)=>{
    const resultReqData = new quizResultsModel(req.body);
    console.log('quizResultData',resultReqData);
    if(req.body.constructor == Object && Object.keys(req.body).length == 0){
        res.send(400).send({
            succes:false,
            message:'Please fill all fields'
        });
    }else{
        quizResultsModel.createResult(resultReqData,(err,result)=>{
            if(err){
                res.send(err);
            }
            res.json({
                succes:true,
                message:'Result Created succesfully',
                data:result.id
            })
        })
    }
}