require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
const http = require('http');

const app = express();

const server = http.createServer(app);
var io = require("socket.io")(server,{cors:{origin:"*"}});

app.use(express.json()); 

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
};  
app.use(cors(corsOptions));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
    //res.setHeader('Content-Range','posts 0-20/100');
    next();
});
app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());



app.get('/',(req,res)=>{
    res.send('Hello world');
});



const questionRoutes = require('./routes/questionRoutes');
const chapterRoutes = require('./routes/chapterRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const userRoutes = require("./routes/userRoutes");
const statRoutes = require('./routes/statisticRoutes');
const livesRoutes = require('./routes/livesRoutes');
const quizResultsRoutes = require('./routes/quizResultsRoutes');
const roomRoutes = require('./routes/roomRoutes');
const playerRoutes = require('./routes/playerRoutes');
const scoreRoutes = require('./routes/scoreRoutes');
const difficultyRoutes = require('./routes/difficultyRoutes');
const educationRoutes = require('./routes/educationRoutes');
const genderRoutes = require('./routes/genderRoutes');
const flashquizRoutes = require('./routes/flashquizRoutes');

app.use('/api/v1/question',questionRoutes);

app.use('/api/v1/chapter',chapterRoutes);

app.use('/api/v1/subject',subjectRoutes);

app.use('/api/v1/users',userRoutes);

app.use('/api/v1/statistics',statRoutes);

app.use('/api/v1/lives',livesRoutes);

app.use('/api/v1/results',quizResultsRoutes);

app.use('/api/v1/rooms',roomRoutes);

app.use('/api/v1/oplayers',playerRoutes);

app.use('/api/v1/scores',scoreRoutes);

app.use('/api/v1/difficulty',difficultyRoutes);

app.use('/api/v1/education',educationRoutes);

app.use('/api/v1/gender',genderRoutes);

app.use('/api/v1/flashquiz',flashquizRoutes);


const roomModel = require('./models/roomsModel');

const oPlayerModel = require('./models/onlinePlayersModel')
const { log } = require("console");

server.listen(process.env.APP_PORT,'0.0.0.0',()=>{
    console.log(`Api running at port ${process.env.APP_PORT}`);
})

io.on('connection',(socket)=>{
    console.log("connected!");
    let roomId = 0
   
    socket.on("createRoom",async ({roomName,roomPassword,userId,rounds,userName})=> {

        console.log(roomName);
        console.log(socket.id);
        try{
            roomReqData = {
                "capacity":1,
                "roomName":roomName,
                "roomCode":roomPassword,
                "rounds":rounds,
                "active":true
            }
            
            
        const createRoomPromise = new Promise((resolve,reject)=>{
            roomModel.createRoom(roomReqData,(err,room)=>{
                if(err){
                    reject(err)
                }else{
                    console.log(room);
                   resolve(room)
                    
                }
            })
        })
       
        createRoomPromise.then((room)=>{
            roomId=room.insertId
            socket.join(roomId)
            roomReqData = {
                "id":roomId,
                "capacity":1,
                "userName":userName,
                "roomName":roomName,
                "roomCode":roomPassword,
                "rounds":rounds,
                "active":true
            } 
            playerReqData = {
                "socketId":socket.id,
                "userId":userId,
                "userName":userName,
                "roomId":roomId,
                "points":0
            }
            const addPlayerPromise = new Promise((resolve,reject)=>{
            oPlayerModel.createNewPlayer(playerReqData,(err,player)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(player)
                }
            })
            })
            addPlayerPromise.then((player)=>{
                console.log(roomReqData);
                io.to(roomId).emit('createRoomSucces',roomReqData)
            })
            
        })
        
        }catch(e){
            console.log(e);
        }
    })

    socket.on("joinRoom",async ({userName,roomId,userId})=>{
        console.log(roomId);
        try {
            if(Number.isInteger(roomId) == false){
                console.log("integer");
                socket.emit('errorOccured','Please enter a valid room id');
                return;
            }
            const getRoomByIdPromise = new Promise((resolve,reject)=>{
                roomModel.getRoomByID(roomId, (err, room) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(room);
                }
            })
            })
            getRoomByIdPromise.then((room)=>{
                
                if(room.length == 0){
                    console.log("There is no such room");
                    return;
                }
                if(room[0].capacity == 1){
                    console.log("blabala");
                    playerReqDataJoin = {
                        "socketId":socket.id,
                        "userId":userId,
                        "userName":userName,
                        "roomId":roomId,
                        "points":0,
                    }
                    socket.join(roomId);
                    const joinPlayerPromise = new Promise((resolve,reject)=>{
                        oPlayerModel.createNewPlayer(playerReqDataJoin,(err,player)=>{
                            if(err){
                                reject(err)
                            }else{
                                resolve(player)
                            }
                        })
                 
                        })
                    const updateCapacityPromise = new Promise((resolve,reject)=>{
                            roomModel.updateCapacityQuestion(roomId,(err,res)=>{
                                if(err){
                                    reject(err);
                                }else{
                                    resolve(res);
                                }
                            })
                            })
                    joinPlayerPromise.then((player)=>{
                            console.log(player);
                            updateCapacityPromise.then((res)=>{
                                console.log(res.message);
                            })
                            room[0].capacity=2;
                            const getPlayersForRoomPromise = new Promise((resolve,reject)=>{
                                oPlayerModel.getPlayersByRoomId(room[0].id,(err,res)=>{
                                    if(err){
                                        reject(err)
                                    }else{
                                        resolve(res);
                                    }
                                })
                            })
                            getPlayersForRoomPromise.then((players)=>{
                                console.log(players[0].toString()+" "+players[1].toString());
                                io.to(roomId).emit('joinRoomSucces',room[0])
                               console.log("Csatalkozott!!!!!!!");
                                io.to(roomId).emit('updateRoom',room[0]) 
                                io.to(roomId).emit('updatePlayers',players)
                            })

                            
                        })
                    
                }else{
                    console.log("The room is full,try again later");
                    socket.emit('errorOccurred','The room is full,try again later');
                }
                
            })
             
           
        } catch (error) {
            console.log(error);
        }
    })
});