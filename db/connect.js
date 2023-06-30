var mysql = require('mysql');

var con = mysql.createPool({
    connectionLimit:20,
    port:process.env.DB_PORT,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.MYSQL_DB,
    multipleStatements: true
})

con.getConnection(function(err,connection){
    if(err) throw err;
    console.log("Connected to database");
    connection.release();
})

module.exports = con