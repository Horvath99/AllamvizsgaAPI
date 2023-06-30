const { 
    create,
    getUsersById,
    getUsers,
    getAdmins,
    updateUser,
    deleteUser,
    getUserByUserEmail, 
    changePassword,
    getAdminByEmail} = require("../services/user.service");


const { genSaltSync,hashSync,compareSync } = require("bcrypt");

const { sign } = require("jsonwebtoken");


module.exports = {
    //not fully tested
    createUser:(req,res) =>{
        const body = req.body;
        const salt = genSaltSync(10); // encrypting password
        body.password = hashSync(body.password,salt);
        create(body,(err,results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    succes:0,
                    message:"Database connection error"
                })
            }
            return res.status(200).json({
                succes:1,
                data:results
            })
        })
    },
    passwordChange:(req,res) =>{
        password = req.body.password;
        const id = req.body.id;
        console.log(password);
        const salt = genSaltSync(10);
        password = hashSync(password,salt);
        changePassword(id,password,(err,results) =>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"Couldnt change password"
                })
            }else{
                return res.status(200).json({
                    success:1,
                    data:results
                })
            }
        })
    },
    //working but not tasted
    getUsersById: (req,res) =>{
        const id = req.params.id;
        getUsersById(id,(err,results)=>{
            if(err){
                console.log(error);
                return;
            }
            if(!results){
                return res.json({
                    succes:0,
                    message:"Record not found"
                })
            }
            return res.json({
                succes:1,
                data:results
            })
        });
    },
    getUsersForAdmin:(req,res) =>{
        getUsers((err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.status(200).json({
                succes:1,
                data:results
            });
        });
    },
    //not tested
    getUsers:(req,res) =>{
        getUsers((err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.status(200).json({
                succes:1,
                data:results
            });
        });
    },
    getAdminList:(req,res) =>{
        getAdmins((err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.status(200).json({
                succes:1,
                data:results
            });
        });
    },
    //not tested
    updateUser:(req,res) => {
        const body=req.body;
        console.log(body);
        //const salt = genSaltSync(10);
        //body.password=hashSync(body.password,salt);
        updateUser(body,(err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(results == undefined){
                return res.json({
                    succes:0,
                    message:"Failed to update user"
                });
            }
            console.log(results);
            return res.json({
                succes:1,
                message:"updated succesfully"
            });
        });
    },//not tested
    deleteUser:(req,res) =>{
        const data = req.params.id;
        deleteUser(req.params.id,(err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(results == []){
                return res.json({
                    succes:0,
                    message:"Record not found"
                });
            }
            return res.json({
                succes:1,
                message:"user deleted succesfully"
            });
        });
    },
    //working but not tested
    login:(req,res)=>{
        const body = req.body;
        getUserByUserEmail(body.email,(err,results)=>{
            console.log(body.email);
            if(err){
                console.log(err);
                return;
            }
            if(results == undefined){
                console.log("Invalid email or password");
                return res.status(401).json({
                    succes:0,
                    data:"Invalid email or password"
                });
            }
            console.log(results);
            const result = compareSync(body.password,results.password);
            if(result){
                console.log(results);
                result.password = undefined;
                const jsontoken= sign({result:results},"qwe1234",{
                    expiresIn:"2h"
                });
                return res.json({
                    succes:1,
                    userId:results.id,
                    userName:results.userName,
                    message:"login succesfully",
                    token:jsontoken
                });
            }else{
                return res.status(401).json({
                    succes:0,
                    data:"Invalid email or password"
                });
            }
        });
    },
    adminLogin:(req,res)=>{
        const body = req.body;
        getAdminByEmail(body.email,(err,results)=>{
            console.log(body.email);
            if(err){
                console.log(err);
                return;
            }
            if(results == undefined){
                console.log("Invalid email or password");
                return res.status(401).json({
                    succes:0,
                    data:"Invalid email or password"
                });
            }
            console.log(results);
            const result = compareSync(body.password,results.password);
            if(result){
                console.log(results);
                result.password = undefined;
                const jsontoken= sign({result:results},"qwe1234",{
                    expiresIn:"2h"
                });
                return res.json({
                    succes:1,
                    userId:results.id,
                    userName:results.userName,
                    message:"login succesfully",
                    token:jsontoken
                });
            }else{
                return res.status(401).json({
                    succes:0,
                    data:"Invalid email or password"
                });
            }
        });
    }
}