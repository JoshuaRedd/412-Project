'use strict';

const path = require("path")
const express = require('express');
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const mysql = require('mysql');
const { stat } = require("fs");
const { time } = require("console");

let con = mysql.createConnection({
  host: 'mysql',
  port: '3306',
  user: 'root',
  password: 'admin'
});

const PORT = 8000;
const HOST = '0.0.0.0';


// Helper
const panic = (err) => console.error(err)


// Connect to database and create new tables 
con.connect((err) => {

    if (err) { panic(err) }

    var sqlCreateDataBase = "CREATE DATABASE IF NOT EXISTS termProject412";
    var sqlConnectToDB = "USE termProject412";

    //Social Media table creation
    var sqlCreateTable = "CREATE TABLE IF NOT EXISTS entries (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, platform TEXT, timeSpent INT, date TIMESTAMP)";

    con.query(sqlCreateDataBase, (err, result) => {
        if (err) { panic(err) }

        else { console.log("Connected!"); }
    })

    con.query(sqlConnectToDB, (err, result) => {
        if (err) {panic(err)}

        else { console.log("Using database");}
    })

    con.query(sqlCreateTable, (err, result) => {
        if (err) {panic(err)}

        else { console.log("Table 1 created");}
    })
})


//CODE FOR SOCIAL MEDIA TABLE//

// Insert client into table with timestamp
app.post("/postEntries",(req,res) => {

    console.log("reached postEntries")

    var platform = req.body.platform;
    var timeSpent = req.body.timeSpent;
    var date = new Date();
    var inserts = [platform,timeSpent,date];

    let statement = `INSERT INTO entries (platform, timeSpent, date) VALUES (?, ?, ?)`

    let preparedStatement = mysql.format(statement, inserts);

    con.query(preparedStatement, (err, result) => {

        if (err) { panic(err) }

        else { console.log(platform + " for " + timeSpent + " minutes. Added to table!")  }

    })
    res.status = 200;
    res.end();
})

app.get('/getEntries', (req,res) => {

    let statement = `SELECT platform, timeSpent, date FROM entries ORDER BY id DESC`
    con.query(statement, (err,result) => {
        if (err) {
            panic(err)
            return
        }
        res.send(result)
    })
})

app.use("/", express.static(path.join(__dirname, "/pages/")))

app.listen(PORT,HOST);
console.log("up!");