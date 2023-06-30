
const questionModel = require('../models/questionModel');

//get question list
exports.getQuestionList = (req,res) =>{
    questionModel.getAllQuestions((err,questions)=>{
        if(err){
            res.send(err);
        }
        console.log('Questions without parameters');
        console.log(questions);
        //console.log(questions.length);
        var length = questions.length;
        var rangeStart = 0;
        var rangeEnd = 10;
        res.setHeader('Content-Range',`bytes ${rangeStart}-${rangeEnd}/${length}`);
        res.status(200).send(questions);
    })
}

//get question by ids
exports.getQuestionByIds = (req,res) =>{
    const {ids} = req.body;
    
    questionModel.getAllQuestionByIDs(ids,(err,questions)=>{
        if(err){
            res.send(err);
        }else{
            console.log(questions);
            res.send(questions);
        }
    })
}
exports.getQuestionsFromStatistics = (req,res) =>{
    questionModel.getQuestionsFromStats(req.params.userId,req.params.quizId,(err,qeustions)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(qeustions);
            res.send(qeustions);
        }
    })
}
//get question list
exports.getAdminQuestionList = (req,res) =>{
    questionModel.getAllQuestionsForAdmin((err,questions)=>{
        if(err){
            res.send(err);
        }
        console.log('Questions without parameters');
        console.log(questions);
        res.status(200).send({status:true,data:questions});
    })
}
//get question list by subject 
//HIBAS
exports.getQuestionListBySuject = (req,res)=>{
    questionModel.getQuestionsBySubject((err,questions)=>{
        if(err){
            res.send(err);
        }
        console.log('Questions by subject');
        console.log(questions);
        res.send(questions);
    })
}


//get question list by subject and chapter
exports.getQuestionListBySujectAndChapter = (req,res)=>{
    questionModel.getQuestionsBySubjectAndChapter(req.params.subject,req.params.chapter,(err,questions)=>{
        if(err){
            res.send(err);
        }
        console.log('Questions by subject and chapter'+req.params.subject+req.params.chapter);
        console.log(questions);
        res.send(questions);
    })
}




//get question by ID
exports.getQuestionByID = (req,res) =>{
    questionModel.getQuestionByID(req.params.id,(err,queston)=>{
        if(err){
            res.send(err);
            console.log('Questions by id');
        }
        res.send(queston);
    })
}



exports.deleteQuestion = (req,res) =>{
 questionModel.delQuestion(req.params.id,(err,question)=>{
    if(err){
        res.send(err);
    }
    res.send({status:true,data:question});
 })   
}

//create new question
exports.createQuestion = (req,res)=>{
    const questionReqData = new questionModel(req.body);
    console.log('questionReqData',questionReqData);
    if(req.body.constructor === Object && Object.keys(req.body).length==0){
        res.send(400).send({succes:false,message:'Please fill all fields'});
    
    }else{

        questionModel.createQuestion(questionReqData,(err,question)=>{
            if(err){
                res.send(err);
            }
            res.json({status:true,message:'Question Created succesfully',data:question.insertId})
        })
    }
}



//update question
exports.updateQuestion = (req,res) =>{
    const questionReqData = new questionModel(req.body);
    const data = {
        id: 1
    }
    console.log('questionReqData update',questionReqData);
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({succes: false,message:'Please fill all fields'});
    }
    else{
        questionModel.updateQuestion(req.params.id,questionReqData,(err,question)=>{
            if(err){
                res.send(err)
                
            }
            const data = {
                id: req.params.id,
                question: req.body.question,
                answers : req.body.answers,
                correctAnswers : req.body.correctAnswers,
                type : req.body.type,
                chapter : req.body.chapter,
                subject : req.body.subject,
                difficulty : req.body.difficulty

            }
            console.log("Question"+data);
            res.json({status:true,data:data});
        })
    }
}
