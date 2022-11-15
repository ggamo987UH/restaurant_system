const express = require('express');
const app = express();
const mysql = require('mysql')
const cors = require('cors');


app.use(express.json());
app.use(cors());




const db = mysql.createConnection({
    host: 'restaurant-server.mysql.database.azure.com',
    user: 'patron',
    password: 'software4351!',
    database: 'restaurant_db_v1'
})




app.post('/register', (req, res) => {
    db.query(
        "INSERT INTO registered_users (username, password, phone, email, name, pref_payment_method) VALUES (?,?,?,?,?,?)",
        [req.body.username, req.body.password, req.body.phone, req.body.email, req.body.name, req.body.payment],
        (err, result) => {
            console.log(err);
        }
    );
});

app.post('/searchBookings', (req, res) => {
    db.query(
        // check if the phone number is in the database and check if the date and time is in the database
        "SELECT * FROM bookings WHERE phone = ? AND date = ? AND time = ?", 
        [req.body.phone, req.body.date, req.body.time],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "No bookings found" });
            }
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
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});