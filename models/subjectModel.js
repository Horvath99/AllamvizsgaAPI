var connection = require('../db/connect')

var Subject = function(data){
    this.subjectId = data.subjectId
    this.subjectName=data.subjectName;
}

Subject.getAllSubjects = (result) =>{
    connection.query('SELECT * FROM subjects WHERE is_deleted = false',(err,res)=>{
        if(err){
            console.log("Error while fetching all subjects");
            result(null,err);
        }else{
            console.log("Subjects fetched succesfully");
            result(null,res);
        }
    })
}

//get subject by id from db
Subject.getSubjectByID = (id,result) =>{
    connection.query('SELECT * FROM subjects WHERE id=?',id,(err,res)=>{
        if(err){
            console.log('Error while getting subjects by id');
            res.send(null,err);
        }else{
            result(null,res)
        }
    })
}


//create new subject
Subject.createSubject = (subjectReqData,result) =>{
    connection.query('INSERT INTO subjects SET ?',subjectReqData,(err,res)=>{
        if(err){
            console.log('Error while inserting data');
            result(null,err);
        }else{
            console.log('Subject succefully created');
            result(null,res);
        }
    })
}
//update Chapter
Subject.updateSubject = (id,subjectReqData,result)=>{
    connection.query("UPDATE subjects SET subjectName=? WHERE subjectId=?",
    [subjectReqData.subjectName,id],
    (err,res)=>{
        if(err){
            console.log("Error while updating subject");
            result(null,err);
        }else{
            console.log("Succesfully updated subject");
            result(null,res);
        }
    })
}


//delete subject
Subject.delSubject = (id,result) =>{
    connection.query("UPDATE questions SET is_deleted=? WHERE subject = ?;Update chapters SET is_deleted=? WHERE subjectId=?;UPDATE subjects SET is_deleted=? WHERE subjectId=?",
    [1,id,1,id,1,id],(err,res)=>{
        if(err){
            console.log('Error while deleting from subjects'+err);
            result(null,err);
        }else{
            console.log('Subject deleted succesfully');
            result(null,res);
        }
    })
}

module.exports=Subject