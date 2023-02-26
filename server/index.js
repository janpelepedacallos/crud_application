const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2")
const cors = require("cors");

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'crud_application'
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM crud_application.crud_db";
    db.query(sqlGet, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    })
})

app.post("/api/post", (req, res) => {
    const {name, email, contact} = req.body;
    const sqlInsert = "INSERT INTO crud_application.crud_db (name, email, contact) VALUES (?, ?, ?)";
    db.query(sqlInsert, [name, email, contact], (err, result) => {
        if (err) {
            throw err;
        } 
    })
})

app.delete("/api/remove/:id", (req, res) => {
    const { id } = req.params;
    sqlRemove = "DELETE FROM crud_application.crud_db WHERE id = ?"

    db.query(sqlRemove, id, (err, result) => {
        if (err) {
            throw err;
        }
    })
})

app.get("/api/get/:id", (req, res) => {
    const {id} = req.params;
    const sqlGet = "SELECT * FROM crud_application.crud_db WHERE id = ?";

    db.query(sqlGet, id, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    })
})

app.put("/api/update/:id", (req, res) => {
    const {id} = req.params;
    const {name, email, contact} = req.body;
    const sqlUpdate = "UPDATE crud_application.crud_db SET name = ?, email = ?, contact = ? WHERE id = ?";

    db.query(sqlUpdate, [name, email, contact, id] , (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    })
})

app.get("/", (req, res) => {
    // const sqlInsert = "INSERT INTO crud_application.crud_db (name, email, contact) VALUES ('JP Dacallos', 'jphillipdacallo@gmail.com', '09773440291')";
    // db.query(sqlInsert, (err, result) => {
    //     console.log("error", err);
    //     console.log("result", result);

    //     res.send("Hello Pelepe");
    // })
})

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})