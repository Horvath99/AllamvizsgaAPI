const con = require('../db/connect');
var connection = require('../db/connect');

var QuizResults = function(data){
    this.quizId = data.quizId;
    this.date= data.date;
    this.score = data.score;
    this.length = data.length;
    this.userId = data.userId;
    this.subject = data.subject
};

//getAllResults
QuizResults.getAllResults = (results) =>{
    connection.query('SELECT * FROM quizresults',(err,res)=>{
        if(err){
            console.log('Error while getting all results');
            results(null,err);
        }else{
            console.log('Results fetched succefully');
            results(null,res);
        }
    });
}
QuizResults.getAllResultsAdmin = (results) =>{
    connection.query('SELECT id,(SELECT userName FROM users WHERE id = userId) as userName,date,score,length,subject FROM quizresults',(err,res)=>{
        if(err){
            console.log('Error while getting all results');
            results(null,err);
        }else{
            console.log('Results fetched succefully');
            results(null,res);
        }
    });
}
QuizResults.getRecentResults = (results) =>{
    connection.query('SELECT (select userName from users where id = userId) as userName,date,score,length from quizresults ORDER BY date DESC;',
    (err,res)=>{
        if(err){
            console.log('Error while getting recent results');
            results(null,err);
        }else{
            console.log('Succesfully fetched recent results');
            results(null,res);
        }
    });
}
//getAvgResultsForLeaderboard
QuizResults.getLeaderboardResults = (results)=>{
    connection.query('SELECT userId, (select userName from users where id = userId) AS username,Round(AVG(score/length),2) as AVG FROM `quizresults` GROUP BY userId;',
    (err,res)=>{
        if(err){
            console.log('Error while getting leaderboard resutls');
            results(err,null)
        }else{
            console.log('Succesfully got Leaderboard results');
            console.log(res);
            results(null,res)
        }
    })
}

QuizResults.getResultsOfUser = (userId,result) =>{
    connection.query('SELECT * FROM quizresults WHERE userId=?',userId,(err,res)=>{
        if(err){
            console.log('Error while getting results of user');
            result(null,err);
        }
        else{
            console.log('Succesfully fetched results of user');
            result(null,res);
        }
    });
}

QuizResults.createResult = (resultReqData,result)=>{
    connection.query('INSERT INTO quizresults SET ?',resultReqData,(err,res)=>{
        if(err){
            console.log('Error while inserting data in quizresults');
            results(null,err);
        }else{
            console.log('Result succesfully created');
            result(null,res);
        }
    })
}

module.exports = QuizResults;