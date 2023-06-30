
var connection = require('../db/connect')

var Room = function(data){
    
    this.capacity = data.capacity;
    this.rounds = data.rounds;
    this.roomName = data.roomName;
    this.roomCode = data.roomCode;
    this.active = data.active;
}

// get all rooms
Room.getAllRooms = (result) => {
    connection.query('SELECT * FROM rooms',(err,res)=>{
        if(err){
            console.log('Error while fetching all rooms');
            result(null,err);
        }else{
            console.log('Rooms succesfully fetched');
            result(null,res);
        }
    })
}


//get room by id from db
Room.getRoomByID = (id,result) =>{
    connection.query('SELECT * FROM rooms WHERE id=?',id,(err,res)=>{
        if(err){
            console.log('Error while getting room by id');
            result(null,err);
        }else{
            console.log('Succesfully got room by id:');
            console.log(res);
            result(null,res)
        }
    })
}

//update question
Room.updateCapacityQuestion = (id,result) =>{
    connection.query("UPDATE rooms SET capacity=capacity+1 WHERE id=?",
    [id],
    (err,res)=>{
        if(err){
            console.log('Error while updating room');
            result(null,err);
        }else{
            console.log('Room succesfully updated');
            result(null,res);
        }
    })
}

//create new room
Room.createRoom = (roomReqData,result) =>{
    connection.query('INSERT INTO rooms SET ?',roomReqData,(err,res)=>{
        if(err){
            console.log('Error while inserting room');
            console.log(err);
            result(null,err);
        }else{
            console.log(`Room inserted succesfully ${res.insertId}`);
            result(null,res);
        }
    })
}

module.exports=Room;

