const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database(':memory:');
const app = express();
db.serialize(()=>{
    db.run('CREATE TABLE users')
});
// const db = mysql.createPool({
//     host: ""
// })
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.post('user/registration', (req, res)=>{
    const userData = req.body
    const query = 'INSERT INTO user (username, password, full_name, supervisor_id, type) VALUES (?, ?, ?, ?, ?)'
    query.run(userData.username, userData.password, userData.fullName, userData.supervisor_id, userData.type)
});

const PORT = 8888;
app.listen(PORT, ()=>{
    console.log("Running on port", + PORT)
});