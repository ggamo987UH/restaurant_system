const express = require('express');
const app = express();
const mysql = require('mysql')
const cors = require('cors');
const { response } = require('express');


app.use(express.json());
app.use(cors());




const db = mysql.createConnection({
    host: 'restaurant-server.mysql.database.azure.com',
    user: 'patron',
    password: 'software4351!',
    database: 'restaurant_db_v1'
});




app.post('/register', (req, res) => {
    db.query(
        "INSERT INTO registered_users (username, password, phone, email, name, pref_payment_method) VALUES (?,?,?,?,?,?)",
        [req.body.username, req.body.password, req.body.phone, req.body.email, req.body.name, req.body.payment],
        (err, result) => {
            console.log(err);
        }
    );
});

app.post('/insertBookings', (req, res) => {
    var partySizee = req.body.partySize;
    var dateValue = req.body.partyDate;
    var timeValue = req.body.partyTime;
    var phoneValue = req.body.phone;
    if (partySizee == 0 || dateValue == "" || timeValue == "" || phoneValue == "") {
        return;
    }
    db.query(
        "INSERT INTO reservationinfo (partySize, partyDate, partyTime, phone) VALUES (?,?,?,?)",
        [partySizee, dateValue, timeValue, phoneValue],
        (err, result) => {
            if (err) {
                // res.send({ message: "Error! Please try again." });
                if(err.code === 'ER_DUP_ENTRY'){
                    res.send({ message: "Time slot is unavailable!" });
                }
                else{
                    res.send({ message: "Error! Please try again." });
                }
            } else {
                res.send({ message: "Booking Successfully Created!" });
            }
        }
    );
    //update table_tracker table
    // db.query(
    //     $data = "SELECT * FROM table_tracker WHERE partyDate = ? AND partyTime = ?",
    //     [dateValue, timeValue],
    //     (err, result) => {
    //     }
    // );
    // if ($data == null)
    // {
    //     db.query(
    //         "INSERT INTO table_tracker (partyDate, partyTime) VALUES (?,?,?,?)",
    //         [dateValue, timeValue, 5, 5, 5, 5],
    //         (err, result) => {
    //             if (err == null)
    //             {
    //                 console.log("Table Add Successful");
    //             }
});

app.listen(3001, () => {
    console.log('Server running on port 3001');

    db.connect((err) => {
        if (err) {
            throw err;
        }
        console.log('Connected to database');
    })
});

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM restaurant_db_v1.registered_users;";
    // const sqlSelect = "SELECT * FROM restaurant_db_v1.reservation_info;";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});