const livesModel = require('../models/livesModel');

exports.getAllLives = (req,res) =>{
    livesModel.getAllLifes((err,lives)=>{
        if(err){
            res.send(err);
        }
        console.log('Lives/n'+lives);
        res.send(lives);
    })
}
exports.getUserLives = (req,res)=>{
    livesModel.getLiveByUserID(req.params.id,(err,lives)=>{
        if(err){
            res.send(err);
        }
        res.send(lives);
    })
};
exports.updateLivesOfUser = (req,res)=>{
    
    /*if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({
            succes:false,
            message:'Give all fields'
        });
    }
    else{*/
        livesModel.updateByUserID(req.params.id,req.params.lives,(err,lives)=>{
            if(err){
                console.log(err);
                res.send(err);
                
            }
            res.json({
                status:true,
                message:'Lives updated succesfully'
            });
        });
   // }
    
}
exports.increaseWithOneUserLife = (req,res)=>{
    
    /*if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({
            succes:false,
            message:'Give all fields'
        });
    }
    else{*/
        livesModel.increaseWithOneUserLives(req.params.id,(err,lives)=>{
            if(err){
                console.log(err);
                res.send(err);
                
            }
            res.json({
                status:true,
                message:'Lives updated succesfully'
            });
        });
   // }
    
}