
var connection = require('../db/connect')


var Question = function(data){
    this.question = data.question;
    this.answers = data.answers;
    this.correctAnswers = data.correctAnswers;
    this.type = data.type;
    this.chapter = data.chapter;
    this.subject = data.subject;
    this.difficulty = data.difficulty;
}

//get all qeustions
Question.getAllQuestions = (result) =>{
    connection.query('SELECT * FROM questions',(err,res)=>{
        if(err){
            console.log('Error while fetching all questions');
            result(null,err);
        }else{
            console.log('Questions fetched succesfully');
            result(null,res);
        }
    })
}
//get all qeustions
Question.getAllQuestionsForAdmin = (result) =>{
    connection.query('SELECT id,question,answers,correctAnswers,(select subjectName from subjects where subjectId = subject) as subject,(select chapterName from chapters WHERE chapterId = chapter) as chapter, (select name from difficulty where id = difficulty) as difficulty FROM questions WHERE is_deleted = false;',
    (err,res)=>{
        if(err){
            console.log('Error while fetching all questions');
            result(null,err);
        }else{
            console.log('Questions fetched succesfully');
            result(null,res);
        }
    })
}

//get question by ids
Question.getAllQuestionByIDs = (ids,result)=>{
    console.log(ids);
    connection.query(`SELECT * FROM questions WHERE id IN (${ids})`,
    ids,
    (err,res)=>{
        if(err){
            console.log('Error while getting questions by ids'+err);
            result(null,err);
        }else{
            console.log('Succesfully got questions by ids');
            result(null,res);
        }
    })
}

//getquestions by user id and quiz id from stats
Question.getQuestionsFromStats = (userId,quizId,result)=>{
    connection.query('SELECT * FROM questions WHERE id IN (SELECT questionId FROM statistics WHERE userId=? and quizId=?)',
    [userId,quizId],
    (err,res)=>{
        if(err){
            console.log('Error while getting questions from stats');
            result(null,err);
        }else{
            console.log('Succesfully got questions from stats');
            result(null,res)
        }
    })
}

//get questions by subject
Question.getQuestionsBySubject = (subject,result) =>{
    connection.query('SELECT * FROM questions WHERE subject=?',subject,(err,res)=>{
        if(err){
            console.log('Error while getting all questions by subject');
        }else{
            result(null,res);
        }
    })
}


//get questions by subject and chapter
Question.getQuestionsBySubjectAndChapter = (subject,chapter,result) =>{
    connection.query('SELECT * FROM questions WHERE subject=? AND chapter=?',[subject,chapter],(err,res)=>{
        if(err){
            console.log('Error while getting all questions by subject and chapter');
            result(null,err);
        }else{
            result(null,res);
        }
    })
}

//get question by id from db
Question.getQuestionByID = (id,result) =>{
    connection.query('SELECT * FROM questions WHERE id=?',id,(err,res)=>{
        if(err){
            console.log('Error while getting question by id');
            result(null,err);
        }else{
            console.log('Succesfully got question by id:');
            console.log(res);
            result(null,res)
        }
    })
}

//create new question
Question.createQuestion = (questionReqData,result) =>{
    connection.query('INSERT INTO questions SET ?',questionReqData,(err,res)=>{
        if(err){
            console.log('Error while inserting data'+err);
            result(null,err);
        }else{
            console.log('Question succefully created');
            result(null,res);
        }
    })
}

//update question
Question.updateQuestion = (id,questionReqData,result) =>{
    connection.query("UPDATE questions SET question=?,answers=?,correctAnswers=?,type=?,chapter=?,subject=?,difficulty=? WHERE id=?",
    [questionReqData.question,questionReqData.answers,questionReqData.correctAnswers,questionReqData.type,questionReqData.chapter,questionReqData.subject,questionReqData.difficulty,id],
    (err,res)=>{
        if(err){
            console.log('Error while updating question' + err);
            result(null,err);
        }else{
            console.log('Question succesfully updated');
            result(null,res);
        }
    })
}


Question.delQuestion = (id,result) =>{
    connection.query("UPDATE questions SET is_deleted=? WHERE id=?",
    [1,id],
    (err,res)=>{
        if(err){
            console.log('Error while deleting from question'+err);
            result(null,err);
        }else{
            console.log('Question succesfully deleted');
            result(null,res);
        }
    })
    /*connection.query("DELETE FROM statistics WHERE questionId = ?; DELETE FROM questions WHERE id = ?",[id,id],(err,res)=>{
        if(err){
            console.log('Error while deleting from question'+err);
            result(null,err);
        }
        else{
            console.log('Question succesfully deleted');
            result(null,res);
        }
    })*/
}
module.exports=Question;