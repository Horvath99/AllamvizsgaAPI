const roomModel = require('../models/roomsModel');

//get all rooms
exports.getRoomList = (req,res) =>{
    roomModel.getAllRooms((err,rooms) =>{
        if(err){
            res.send(err);
        }
        console.log('Rooms:');
        console.log(rooms);
        res.send(rooms);
    })
}

//get room by ID
exports.getRoomByID = (req,res) =>{
    roomModel.getRoomByID(req.params.id,(err,room)=>{
        if(err){
            res.send(err);
            console.log('Room by id');
        }
        res.send(queston);
    })
}


//update room
exports.updateQuestion = (req,res) =>{
    roomModel.updateQuestion(req.params.id,(err,room)=>{
            if(err){
                res.send(err)
            }
            res.json({status:true,message:'Question updated succesfully'})
        })
    
}

//create new room
exports.createRoom = (req,res) =>{
    const roomReqData = new roomModel(req.body);
    if(req.body.constructor == Object && Object.keys(req.body).length == 0){
        res.send(400).send({succes:false,message:'Please fill all fields'});

    }else{
        roomModel.createRoom(roomReqData,(err,room)=>{
            if(err){
                res.send(err);
            }
            res.send({ success: true, message: 'Room created', roomId: room.insertId })
        })
    }
}

