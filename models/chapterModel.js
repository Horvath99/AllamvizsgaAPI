var connection = require('../db/connect')

var Chapter = function(data){
    this.chapterName=data.chapterName;
    this.subjectId=data.subjectId;
}

Chapter.getAllChapters = (result) =>{
    connection.query('SELECT * FROM chapters',(err,res)=>{
        if(err){
            console.log("Error while fetching all chapters");
            result(null,err);
        }else{
            console.log("Chapters fetched succesfully");
            result(null,res);
        }
    })
}
Chapter.getAllChaptersForAdmin = (result) =>{
    connection.query('SELECT chapterId,chapterName,(select subjectName from subjects s where s.subjectId = c.subjectId ) as subjectId FROM chapters c WHERE is_deleted = false;',(err,res)=>{
        if(err){
            console.log("Error while fetching all chapters");
            result(null,err);
        }else{
            console.log("Chapters fetched succesfully");
            result(null,res);
        }
    })
}

//get chapter by id from db
Chapter.getChapterByID = (id,result) =>{
    connection.query('SELECT * FROM chapters WHERE subjectId=? AND is_deleted = false',id,(err,res)=>{
        if(err){
            console.log('Error while getting chapter by id');
            result(null,err);
        }else{
            result(null,res)
        }
    })
}

//create new subject
Chapter.createChapter = (chaptersReqData,result) =>{
    connection.query('INSERT INTO chapters SET ?',chaptersReqData,(err,res)=>{
        if(err){
            console.log('Error while inserting data');
            result(null,err);
        }else{
            console.log('Chapter succefully created');
            result(null,res);
        }
    })
}
Chapter.updateChapter = (id,chapterReqData,result) =>{
    console.log(chapterReqData);
    connection.query("Update questions SET subject=? WHERE chapter=?;UPDATE chapters SET chapterName=?,subjectId=? WHERE chapterId=?",
    [chapterReqData.subjectId,id,chapterReqData.chapterName,chapterReqData.subjectId,id],
    (err,res)=>{
        if(err){
            console.log('Error while updating chapters'+err);
            result(null,res);
        }else{
            console.log('Succesfully updated chapters');
            result(null,res);
        }
    })
}
Chapter.delChapter = (id,result) =>{
    connection.query("UPDATE questions SET is_deleted=? WHERE chapter=?;UPDATE chapters SET is_deleted=? WHERE chapterId=?",
    [1,id,1,id],(err,res)=>{
        if(err){
            console.log('Error while deleting from chapters'+err);
            result(null,err);
        }else{
            console.log('Chapter deleted succesfully');
            result(null,res);
        }
    })
    /*connection.query(" DELETE DELETE FROM questions WHERE chapter=?; DELETE FROM chapters WHERE chapterId = ?",[id,id],(err,res)=>{
        if(err){
            console.log('Error while deleting from chapters'+err);
            result(null,err);
        }
        else{
            console.log('Chapter succesfully deleted');
            result(null,res);
        }
    })*/
}

module.exports=Chapter