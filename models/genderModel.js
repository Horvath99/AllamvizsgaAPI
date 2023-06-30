
var connection = require('../db/connect');


var Gender = function(data){
    this.name = data.name;
}

Gender.getAllGenders = (result) =>{
    connection.query('SELECT * FROM gender',(err,res) =>{
        if(err){
            console.log("Error while fetching genders");
            result(null,err);
        }else{
            console.log("Genders fetched succesfully");
            result(null,res);
        }
    })
}

Gender.getGenderById = (id,result) =>{
    connection.query('SELECT * FROM gender WHERE id =?',id,(err,res)=>{
        if(err){
            console.log('Error while fetching gender by id');
            result(null,err);
        }else{
            console.log('Gender by id succesfully fetched');
            result(null,res);
        }
    })
}

module.exports = Gender;