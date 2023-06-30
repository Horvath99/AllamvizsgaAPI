
var connection = require('../db/connect');

var Statistic = function(data){
    this.questionId=data.questionId;
    this.userId=data.userId;
    this.quizId=data.quizId;
    this.yourAnswer=data.yourAnswer;
    this.date=data.date;
    
}

Statistic.getAllStats = (result) =>{
    connection.query('SELECT * FROM statistics',(err,res)=>{
        if(err){
            console.log("Error while fetching all stats");
            result(null,err);
        }else{
            console.log("Stats fetched succesfully");
            result(null,res);
        }
    });
}
Statistic.getAllStatsByQuizAndUserId = (userId,quizId,result) =>{
    connection.query('SELECT * FROM statistics WHERE userId=? AND quizId=?',[userId,quizId],(err,res)=>{
        if(err){
            console.log("Error while fetching all stats by user and quizId:");
            result(null,err);
        }else{
            console.log("Stats fetched succesfully");
            result(null,res);
        }
    });
}

Statistic.getStatByUserID = (id,result) =>{
    connection.query('SELECT * FROM statistics WHERE userId=?',id,(err,res)=>{
        if(err){
            console.log('Error while getting stats by id');
            result(null,err);
        }else{
            console.log('Stat by userId succesfully fetched');
            result(null,res);
        }
    })
}

Statistic.getMaxQuizIDByUser=(userId,result)=>{
    connection.query('SELECT MAX(quizId) FROM statistics WHERE userId=?',userId,(err,res)=>{
        if(err){
            console.log('Error while getting max QuizId for user');
            result(null,err);
        }else{
            console.log('Succesfully fetched max quizID for user');
            result(null,res);
        }
    });
};

Statistic.createStat = (statReqData,result) =>{
    connection.query('INSERT INTO statistics SET ?',statReqData,(err,res)=>{
        if(err){
            console.log('Error while creating statistic data');
            console.log(err);
            result(null,err);
        }else{
            console.log('Stat inserted succesfully');
            result(null,res);
        }
    });
}

module.exports = Statistic;