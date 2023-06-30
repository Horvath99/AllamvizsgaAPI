const oPlayerModel = require('../models/onlinePlayersModel');

//getPlayerList

exports.getPlayersList = (req,res) =>{
    oPlayerModel.getAllPlayers((err,players)=>{
        if(err){
            res.send(err);
        }
        console.log('Players:');
        console.log(players);
        res.send(players);
    })
}

//get player by userId
exports.getPlayerById = (req,res)=>{
    oPlayerModel.getPlayersByRoomId(req.params.id,(err,players)=>{
        if(err){
            res.send(err);
        }
        res.send(players);
    })
}

//get player by roomId
/*exports.getPlayerById = (req,res)=>{
    oPlayerModel.getRo(req.params.id,(err,players)=>{
        if(err){
            res.send(err);
        }
        res.send(players);
    })
}*/


//create player
exports.createPlayer = (req,res)=>{
    const playerReqData = new oPlayerModel(req.body);
    if(req.body.constructor == Object && Object.keys(req.body).length == 0){
        res.send(400).send({
            succes:false,
            message:'Not enough info'
        })
    }else{
        oPlayerModel.createNewPlayer(playerReqData,(err,player)=>{
            if(err){
                res.send(err);
            }
            res.json({
                succes:true,
                message:'Player created succesfully',
                data:player.insertId
            })
        })
    }
}
