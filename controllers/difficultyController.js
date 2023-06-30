const  difficultyModel = require('../models/difficultyModel');

exports.getAllDiff = (req,res)=>{
    difficultyModel.getAllDifficulties((err,result)=>{
        if(err){
            res.send(err);
        }else{
            res.send({status:true,data:result});
        }
    })
}

exports.getDiffById = (req,res) =>{
    difficultyModel.getDiffById(req.params.id,(err,result)=>{
        if(err){
            res.send(err);
        }
        res.send({status:true,data:result});
    })
}