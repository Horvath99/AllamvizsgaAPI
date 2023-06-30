const chapterModel = require('../models/chapterModel');

//get chapter list
exports.getChapterList = (req,res) =>{
    chapterModel.getAllChapters((err,chapters)=>{
        if(err){
            res.send(err);
        }
        console.log('Chapters');
        console.log(chapters);
        res.send(chapters);
    })
}

//get chapter list
exports.getChapterListAdmin = (req,res) =>{
    chapterModel.getAllChaptersForAdmin((err,chapters)=>{
        if(err){
            res.send(err);
        }
        console.log('Chapters');
        console.log(chapters);
        res.send(chapters);
    })
}
//get chapter by ID
exports.getChapterByID = (req,res) =>{
    chapterModel.getChapterByID([req.params.id,req.params.id],(err,chapter)=>{
        if(err){
            res.send(err);
        }
        res.send(chapter);
    })
}

exports.updateChapterById = (req,res) =>{
    const chapterReqData = new chapterModel(req.body);
    console.log(req.params);
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({succes:false,message:"Please fill all fields"});
    }else{
        chapterModel.updateChapter(req.params.id,chapterReqData,(err,result)=>{
            if(err){
                res.send(err);
            }
            res.json({success:true,message:"Success"});
        })
    }
}

//create new chapter
exports.createChapter = (req,res)=>{
    const chapterReqData = new chapterModel(req.body);
    console.log('chapterReqData',chapterReqData);
    if(req.body.constructor === Object && Object.keys(req.body).length==0){
        res.send(400).send({succes:false,message:'Please fill all fields'});
    
    }else{

        chapterModel.createChapter(chapterReqData,(err,chapter)=>{
            if(err){
                res.send(err);
            }
            res.json({status:true,message:'Chapter Created succesfully',data:chapter.insertId})
        })
    }
}

//delete chapter
exports.deleteChapter = (req,res) =>{
    chapterModel.delChapter(req.params.id,(err,chapter)=>{
        if(err){
            res.send(err);
            console.log(err);
        }else{
            res.send({status:true,data:chapter});
        }
        
    })
}