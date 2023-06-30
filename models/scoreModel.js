var connection = require('../db/connect')

var Score = function(data){
    this.roomId = data.roomId;
    this.player1Id = data.player1Id;
    this.player2Id = data.player2Id;
    this.score1 = data.score1;
    this.score2 = data.score2;
}

//get all Scores
Score.getAllScores = (result) =>{
    connection.query('SELECT * FROM score',(err,res)=>{
        if(err){
            console.log('Error while fetching all scores');
            result(null,err);
        }else{
            console.log('Score fetched succesfully');
            result(null,res);
        }
    })
}

//get score by roomId
Score.getScoreByRoomId = (id,result) =>{
    connection.query('SELECT * FROM score WHERE roomId=?',id,(err,res)=>{
        if(err){
            console.log('Error while getting score by room id');
            result(null,err);
        }else{
            console.log('Score succesfully fetched by userId');
            result(null,res);
        }
    })
}

//scorebyplayerId
Score.getScoreByPlayerId = (id,result) =>{
    connection.query('SELECT * FROM score WHERE (player1Id=? OR player2Id=?)',[id,id],(err,res)=>{
        if(err){
            console.log('Error while getting score by room id');
            result(null,err);
        }else{
            console.log('Score succesfully fetched by userId');
            result(null,res);
        }
    })
}

//create newScore
Score.createScore = (scoreReqData,result) =>{
    connection.query('INSERT INTO score SET ?',scoreReqData,(err,res)=>{
        if(err){
            console.log('Error while inserting score');
            result(null,err);
        }else{
            console.log('Score succefully created');
            result(null,res);
        }
    })
}

//update score
Score.updateScore = (roomId,score1,score2,result) =>{
    connection.query("UPDATE score SET score1=score1+?,score2=score2+? WHERE roomId=?",
    [roomId,score1,score2],
    (err,res)=>{
        if(err){
            console.log('Error while updating score');
            console.log(err);
            result(null,err);
        }else{
            console.log('Score succesfully updated');
            result(null,res);
        }
    })
}

module.exports = Score;

//UPDATE score SET score1 = IF(palyer1Id=userId,score1+1,score1) score2=IF(player2Id = userId,score2+1,score2) WHERE roomId=? AND (player1Id = ? OR player2Id =?)