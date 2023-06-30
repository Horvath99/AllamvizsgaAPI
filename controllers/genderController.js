const genderModel = require('../models/genderModel');

//get genders
exports.getGenders = (req,res)=>{
    genderModel.getAllGenders((err,result)=>{
        if(err){
            res.send(err);
        }else{
            res.send(result)
        }
    })
}
//get gender by id 
exports.getGenderByID = (req,res)=>{
    genderModel.getGenderById((err,result)=>{
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}