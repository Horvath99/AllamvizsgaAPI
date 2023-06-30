var connection = require('../db/connect')


var FlashQuiz = function(data){
    this.quizName = data.quizName;
    this.quizIds = data.quizIds;
    this.startDate = data.startDate;
    this.finishDate = data.finishDate;
}

FlashQuiz.getAllFlashQuiz = (result) =>{
    connection.query('SELECT * FROM flashquiz',(err,res)=>{
        if(err){
            console.log('Error while fetching all flashquizes');
            result(null,err);
        }else{
            console.log('Succesfully fetched all flashquizes');
            result(null,res);
        }
    })
}

FlashQuiz.getFlashQuizById = (result) => {
    connection.query('SELECT * FROM flashquiz WHERE id=?',id,(err,res)=>{
        if(err){
            console.log('Error while getting flashquiz by id');
            result(null,err);
        }else{
            console.log('Succesfully fetched flashquiz by id');
            result(null,res);
        }
    })
}

FlashQuiz.createFlashQuiz = (flashQuizData,result) =>{
    connection.query('INSERT INTO flashquiz SET ?',
    flashQuizData,(err,res)=>{
        if(err){
            console.log('Error while inserting flashquiz'+err);
            result(null,err);
        }else{
            console.log('Succesfully created flashquiz');
            result(null,res);
        }
    })
}

FlashQuiz.deleteFlashQuiz = (id,result) =>{
    connection.query("DELETE FROM flashquiz WHERE id = ?",id,(err,res)=>{
        if(err){
            console.log('Error while deleting flashquiz');
            result(null,err);
        }else{
            console.log('Succesfully delted flashquiz');
            result(null,res);
        }
    })
}

module.exports = FlashQuiz;