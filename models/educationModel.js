var connection = require('../db/connect')

var Education = function(data){
    this.education = data.education
}

Education.getAllEducations = (result) =>{
    connection.query('SELECT * FROM education',(err,res)=>{
        if(err){
            console.log("Error while fetching educations");
            result(null,err);
        }else{
            console.log("Succesfully fetched educations");
            result(null,res);
        }
    })
}
//get education by id from db
Education.getEducationByID = (id,result) =>{
    connection.query('SELECT * FROM education WHERE id=?',id,(err,res)=>{
        if(err){
            console.log('Error while getting chapter by id');
            result(null,err);
        }else{
            result(null,res)
        }
    })
}
module.exports = Education