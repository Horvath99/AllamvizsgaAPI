const con = require('../db/connect');
var connection = require('../db/connect')

var Online_players = function(data){
    this.socketId = data.socketId;
    this.userId = data.userId;
    this.userName = data.userName;
    this.roomId = data.roomId;
    this.points = data.points;
}

//get All players
Online_players.getAllPlayers = (result) =>{
    connection.query('SELECT * FROM online_players',(err,res)=>{
        if(err){
            console.log('Error while fetching all players');
            result(null,err);
        }else{
            console.log('Players fetched succesfully');
            result(null,res);
        }
    })
}

//getPlayerById
Online_players.getPlayerByUserId = (id,result) =>{
    connection.query('SELECT * FROM online_players WHERE userId=?',id,(err,res)=>{
        if(err){
            console.log('Error while getting player by userId');
            result(null,err);
        }else{
            console.log('Succesfully fetched player by userId');
            result(null,res);
        }
    })
}

//getPlayerByRoomId
Online_players.getPlayersByRoomId = (id,result) =>{
    connection.query('SELECT * FROM online_players WHERE roomId=?',id,(err,res)=>{
        if(err){
            console.log('Error while getting player by roomId');
            result(null,err);
        }else{
            console.log('Succesfully fetched player by roomId');
            result(null,res);
        }
    })
}

//createNewPlayer
Online_players.createNewPlayer = (playerReqData,result)=>{
    connection.query('INSERT INTO online_players SET ?',playerReqData,(err,res)=>{
        if(err){
            console.log('Error while creating player');
            console.log(err);
            result(null,err);
        }else{
            console.log('Player succesfully created');
            result(null,res)
        }
    })
}

module.exports = Online_players

