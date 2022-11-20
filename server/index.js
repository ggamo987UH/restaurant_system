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

    //update tabletracker table
    db.query(
        "SELECT * FROM tabletracker WHERE date = ? AND time = ?",
        [dateValue, timeValue],
        (err, result, fields) => {
            if (result == undefined || result.length == 0) {
                console.log("INSERTING TABLETRACKER");
                db.query(
                    "INSERT INTO tabletracker (date, time, eight_seat, six_seat, four_seat, two_seat) VALUES (?,?,?,?,?,?)",
                    [dateValue, timeValue, 1, 4, 5, 6],
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                    }
                );
            }

            db.query(
                "SELECT * FROM tabletracker WHERE date = ? AND time = ?",
                [dateValue, timeValue],
                (err, result, fields) => {
                    var eightSeat = result[0].eight_seat;
                    var sixSeat = result[0].six_seat;
                    var fourSeat = result[0].four_seat;
                    var twoSeat = result[0].two_seat;

                    if (partySizee <= 2 && twoSeat > 0) {
                        twoSeat = twoSeat - 1;
                    }
                    else if (partySizee <= 2 && fourSeat > 0) {
                        fourSeat = fourSeat - 1;
                    }
                    else if (partySizee <= 2 && sixSeat > 0) {
                        sixSeat = sixSeat - 1;
                    }
                    else if (partySizee <= 2 && eightSeat > 0) {
                        eightSeat = eightSeat - 1;
                    }
                    else if (partySizee <= 4 && fourSeat >= 1) {
                        fourSeat = fourSeat - 1;
                    }
                    else if (partySizee <= 4 && sixSeat >= 1) {
                        sixSeat = sixSeat - 1;
                    }
                    else if (partySizee <= 4 && eightSeat >= 1) {
                        eightSeat = eightSeat - 1;
                    }
                    else if (partySizee <= 4 && twoSeat >= 2) {
                        twoSeat = twoSeat - 2;
                    }
                    else if (partySizee <= 6 && sixSeat >= 1) {
                        sixSeat = sixSeat - 1;
                    }
                    else if (partySizee <= 6 && eightSeat >= 1) {
                        eightSeat = eightSeat - 1;
                    }
                    else if (partySizee <= 6 && fourSeat >= 2) {
                        fourSeat = fourSeat - 2;
                    }
                    else if (partySizee <= 6 && twoSeat >= 3) {
                        twoSeat = twoSeat - 3;
                    }
                    else if (partySizee <= 6 && twoSeat >= 1 && fourSeat >= 1) {
                        twoSeat = twoSeat - 1;
                        fourSeat = fourSeat - 1;
                    }
                    else if (partySizee <= 8 && eightSeat >= 1) {
                        eightSeat = eightSeat - 1;
                    }
                    else if (partySizee <= 8 && sixSeat >= 2) {
                        sixSeat = sixSeat - 2;
                    }
                    else if (partySizee <= 8 && fourSeat >= 2) {
                        fourSeat = fourSeat - 2;
                    }
                    else if (partySizee <= 8 && twoSeat >= 4) {
                        twoSeat = twoSeat - 4;
                    }
                    else if (partySizee <= 8 && twoSeat >= 2 && fourSeat >= 1) {
                        twoSeat = twoSeat - 2;
                        fourSeat = fourSeat - 1;
                    }
                    else if (partySizee <= 8 && twoSeat >= 1 && sixSeat >= 1) {
                        twoSeat = twoSeat - 1;
                        sixSeat = sixSeat - 1;
                    }
                    else if (partySizee <= 8 && twoSeat >= 3 && fourSeat >= 1) {
                        twoSeat = twoSeat - 3;
                        fourSeat = fourSeat - 1;
                    }
                    else if (partySizee <= 8 && twoSeat >= 3 && sixSeat >= 1) {
                        twoSeat = twoSeat - 3;
                        sixSeat = sixSeat - 1;
                    }
                    else if (partySizee <= 8 && sixSeat >= 1 && fourSeat >= 1) {
                        sixSeat = sixSeat - 1;
                        fourSeat = fourSeat - 1;
                    }
                    else {
                        console.log("No table available");
                        res.send({ message: "No more tables available for that time!" });
                        return;
                    }

                    db.query(
                        "INSERT INTO reservationinfo (partySize, partyDate, partyTime, phone) VALUES (?,?,?,?)",
                        [partySizee, dateValue, timeValue, phoneValue],
                        (err, result) => {
                            if (err) {
                                res.send({ message: "Error! Please try again." });
                            } else {
                                res.send({ message: "Booking Successfully Created!" });
                            }
                        }
                    );

                    db.query(
                        "UPDATE tabletracker SET eight_seat = ?, six_seat = ?, four_seat = ?, two_seat = ? WHERE date = ? AND time = ?",
                        [eightSeat, sixSeat, fourSeat, twoSeat, dateValue, timeValue],
                        (err, result) => {
                            if (err) {
                                console.log(err);
                            }
                        }
                    );
                }
            )
        }
    );
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