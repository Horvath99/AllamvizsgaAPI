const educationModel = require('../models/educationModel');

//get education list

exports.getEducationList = (req,res) =>{
    educationModel.getAllEducations((err,education) =>{
        if(err){
            res.send(err);
        }else{
              res.send(education)
        }
      
    })
}
exports.getEducation = (req,res) =>{
    educationModel.getEducationByID((err,education)=>{
        if(err){
            res.send(err);
        }else{
            res.send(education);
        }
        
    })
}