
var flashQuizModel = require('../models/flashQuizModel');

//get flashQuizList
exports.getFlashQuizList = (req,res) =>{
    flashQuizModel.getAllFlashQuiz((err,flashquiz)=>{
        if(err){
            res.send(err);
        }else{
            res.status(200).send(flashquiz);
        }
    })
}

//getFlashQuizById
exports.getFlashQuizById = (req,res) =>{
    flashQuizModel.getFlashQuizById(req.params.id,(err,flasquiz)=>{
        if(err){
            res.send(err);
        }else{
            res.send({success:true,data:flasquiz})
        }
    })
}

//delete flashquiz
exports.deleteFlashQuiz = (req,res) =>{
    flashQuizModel.deleteFlashQuiz(req.params.id,(err,flashquiz)=>{
        if(err){
            res.send(err);
        }else{
            res.send({success:true,data:flashquiz});
        }
    })
}

//create flashquiz
exports.createNewFlashQuiz = (req,res)=>{
    const flashquizReqData = new flashQuizModel(req.body);
    console.log('flashquizdata',flashquizReqData);
    if(req.body.constructor === Object && Object.keys(req.body).length==0){
        res.send(400).send({succes:false,message:'Please fill all fields'});
    
    }else{

        flashQuizModel.createFlashQuiz(flashquizReqData,(err,flashquiz)=>{
            if(err){
                res.send(err);
            }
            res.json({success:true,message:'Question Created succesfully',data:flashquiz})
        })
    }

}