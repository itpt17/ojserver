require('dotenv').config();
const mysql = require('mysql');

const connect = mysql.createConnection({
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME
});

setInterval(()=>{
    connect.query("SELECT version()",(err,res)=>{
        console.log({err,res});
    })
},5000);

module.exports = connect;

