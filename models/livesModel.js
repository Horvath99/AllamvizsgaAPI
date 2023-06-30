var connection = require('../db/connect');

var Lives = function(data){
    this.userId=data.userId;
    this.livesNumber=data.livesNumber;
}

Lives.getAllLifes = (result)=>{
    connection.query('SELECT * FROM lives',(err,res)=>{
        if(err){
            console.log("Error whule fetching all lives");
            result(null,err);
        }else{
            console.log("Lives fetched succesfully");
            result(null,res);
        }
    });
};

Lives.getLiveByUserID = (id,result)=>{
    connection.query('SELECT * FROM lives WHERE userId=?',id,(err,res)=>{
        if(err){
            console.log('Error while getting lives of a user');
            result(null,err);
        }else{
            console.log('Lives succesfully fetched for this user');
            result(null,res);
        }
    });
}
Lives.updateByUserID = (id,lives,result)=>{
    connection.query('UPDATE lives SET livesNumber=? WHERE userId=?',[lives,id],(err,res)=>{
        if(err){
            console.log('Error while updating life of the user');
            result(null,err);
        }else{
            console.log('Life of this user is succesfully updated');
            result(null,res);
        }
    })
}
Lives.increaseWithOneUserLives = (id,result)=>{
    connection.query('UPDATE lives SET livesNumber=livesNumber + 1 WHERE userId=?',[id],(err,res)=>{
        if(err){
            console.log('Error while updating life of the user');
            result(null,err);
        }else{
            console.log('Life of this user is succesfully updated');
            result(null,res);
        }
    })
}

module.exports = Lives;