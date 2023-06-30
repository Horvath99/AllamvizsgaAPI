
var connection = require('../db/connect');

var Difficulty = function(data){
    this.name = data.name;
}

//get all difficulties
Difficulty.getAllDifficulties = (result) =>{
    connection.query('SELECT * FROM difficulty',(err,res)=>{
        if(err){
            console.log('Error while fetching diff.');
            result(null,err);
        }else{
            console.log('Diff. succesfully fetched');
            result(null,res);
        }
    })
}

//get Diff. by id
Difficulty.getDiffById = (id,result) =>{
    connection.query('SELECT * FROM difficulty WHERE id=?',id,(err,res)=>{
        if(err){
            console.log('Error while fetching diff. by id');
            result(null,err);
        }else{
            console.log('Succesfully fetched diff by id');
            result(null,res);
        }
    })
}

module.exports = Difficulty