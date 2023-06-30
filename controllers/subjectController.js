const subjectModel = require('../models/subjectModel');

exports.getSubjectList = (req,res) =>{
    subjectModel.getAllSubjects((err,subjects)=>{
        if(err){
            res.send(err);
        }
        console.log('Subjects');
        console.log(subjects);
        res.send(subjects);
    })
}

exports.getSubjectByID = (req,res) =>{
    subjectModel.getSubjectByID(req.params.id,(err,subject)=>{
        if(err){
            res.send(err);
        }
        res.send(subject);
    })
}


exports.createSubject = (req,res)=>{
    const subjectReqData = new subjectModel(req.body);
    console.log('subjectReqData',subjectReqData);
    if(req.body.constructor === Object && Object.keys(req.body).length==0){
        res.send(400).send({succes:false,message:'Please fill all fields'});
    
    }else{

        subjectModel.createSubject(subjectReqData,(err,subject)=>{
            if(err){
                res.send(err);
            }
            res.json({status:true,message:'Subject Created succesfully',data:subject.insertId})
        })
    }
}

//update subject
exports.updateSubjectById = (req,res) =>{
    const subjectReqData = new subjectModel(req.body);
    console.log(subjectReqData);
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({succes: false,message:'Please fill all fields'});
    }
    else{
        subjectModel.updateSubject(req.params.id,subjectReqData,(err,result)=>{
            if(err){
                res.send(err)
                
            }
           
            res.json({success:true,data:subjectReqData});
        })
    }
}

exports.deleteSubject = (req,res) =>{
    subjectModel.delSubject(req.params.id,(err,subject)=>{
        if(err){
            res.send(err);
            console.log(err);
        }else{
            res.send({status:true,data:subject});
        }
    })
}
