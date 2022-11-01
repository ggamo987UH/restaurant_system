const express = require('express');
const app = express();
const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'restaurant-server.mysql.database.azure.com',
    user: 'patron',
    password: 'software4351!',
    database: 'restaurant_db_v1'
})


app.get('/', (req, res) => {
    const Insertsql = "SELECT * FROM registered_users";

    db.query(Insertsql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });

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