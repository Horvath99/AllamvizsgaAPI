const pool = require("../db/connect");

module.exports = {
    create:(data,callBack) =>{
         //registerUser
        pool.query(
            `insert into users(firstName,lastName,email,userName,password,gender,education,birthdate,status)
                            values(?,?,?,?,?,?,?,?,?)`,
            [
                data.firstName,
                data.lastName,
                data.email,
                data.userName,
                data.password,
                data.gender,
                data.education,
                data.birthdate,
                data.status
            ],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                pool.query(
                    'insert into lives(userId,livesNumber) VALUES ((select MAX(id) from users),5)',
                    [],
                    (err,res)=>{
                        if(err){
                            return callBack(err);
                        }
                        console.log(res);
                    }
                )
                return callBack(null,results);
            }
        );
    },
    changePassword: (id,password,callBack) =>{
        pool.query("UPDATE users SET password = ? WHERE id=?",
        [password,id],
        (err,res,fields)=>{
            if(err){
            
                return callBack(err);
            }else{
                console.log(id);
                return callBack(null,res);
            }
        })
    },
    getUsers: (callBack) =>{
        pool.query(
            `select id,firstName,lastName,password,userName,email,(SELECT name FROM gender WHERE id = gender )as gender,(SELECT name FROM education WHERE id = education) as education,birthdate from users where is_deleted = false and status = 0`,
            [],
            (error,result,fields) =>{
                if(error){
                    return callBack(error);
                }
                console.log(result);
                return callBack(null,result);
            } 
        );
    },
    getAdmins: (callBack) =>{
        pool.query(
            `select id,firstName,lastName,password,email from users where is_deleted = false and status = 1`,
            [],
            (error,result,fields) =>{
                if(error){
                    console.log("error"+error);
                    return callBack(error);
                }
                console.log(result);
                return callBack(null,result);
            } 
        );
    },
    getUsersById: (id,callBack) =>{
        pool.query(
            `select * from users where id = ?`,
            [id],
            (error,result,fields) =>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,result[0]);
            } 
        );
    },
    updateUser:(data,callBack) =>{
        pool.query(
            "update users set firstName=?,lastName=?,userName=?,email=?,gender=?,education=?,birthdate=?,status=? where id = ?",
            [
                data.firstName,
                data.lastName,
                data.userName,
                data.email,
                data.gender,
                data.education,
                data.birthdate,
                data.status,
                data.id
            ],
            (error,result,fields) =>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,result);
            }
        );
    },
    //when delete user,delete lives and statistics to
    deleteUser:(id,callBack)=>{
        console.log("Data"+id)
        pool.query(
            "UPDATE users SET is_deleted=? WHERE id=?",
            [1,id],
            (err,results)=>{
                if(err){
                    console.log('Error while deleting user');
                    return callBack(err);
                }
                return callBack(null,results[0])
                
            }
        )
        /*pool.query(
            "DELETE FROM lives WHERE userId=?;DELETE FROM statistics WHERE userId=?; DELETE FROM users WHERE id = ?",
            [id,id,id],
            (error,results,fields) =>{
                if(error){
                    console.log(error);
                    callBack(error);
                }
                console.log(results);
                return callBack(null,results[0]);
            }

        );*/
    },
    getUserByUserEmail: (email,callBack) =>{
        pool.query(
            `select * from users where email=?`,
            [email],
            (error,results,fields) =>{
                if(error){
                    return callBack(error);
                }
                console.log(results);
                return callBack(null,results[0]);
            }
        )
    },
    getAdminByEmail: (email,callBack) =>{
        pool.query(
            `select * from users where email=? and is_deleted = 0 and status = 1`,
            [email],
            (error,results,fields) =>{
                if(error){
                    return callBack(error);
                }
                console.log(results);
                return callBack(null,results[0]);
            }
        )
    }
}