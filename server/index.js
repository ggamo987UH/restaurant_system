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


app.listen(3001, () => {
    console.log('Server running on port 3001');

    db.connect((err) => {
        if (err) {
            throw err;
        }
        console.log('Connected to database');
    })
});