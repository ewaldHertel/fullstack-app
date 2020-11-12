const express = require('express');
const router = express.Router();
const Database = require('../persistence/mysql');

const db = new Database();

router.use(function (req, res, next) {
    next();
});

router.get('/', async(req, res) => {
    db.query('SELECT * FROM customer')
    .then(rows => {
        res.status(200) ;
        res.send(rows);
    }, err => {
        throw err;
    })
    .catch(err => {
        res.status(500);
        res.send(err.sqlMessage);
    })
});

router.get('/:id', async(req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM customer WHERE id = ?', [id])
    .then(rows => {
        res.status(200) ;
        res.send(rows);
    }, err => {
        throw err;
    })
    .catch(err => {
        console.log(err);
        res.status(500);
        res.send(err.sqlMessage);
    })
});

router.post('/', async(req, res) => {
    let data = req.body;
    db.query('INSERT INTO customer (firstname, lastname, street, zip, city, birthday, birthplace, phone, email, avatar) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        data.firstname,
        data.lastname,
        data.street,
        data.zip,
        data.city,
        data.birthday,
        data.birthplace,
        data.phone,
        data.email, 
        data.avatar])
    .then(rows => {
        console.log(rows);
        return db.query('SELECT * FROM customer')
    } )
    .then((err, rows) => {
        if(err.code) {
            throw err;
        }
        res.status(200) ;
        res.send(rows);
    }, err => {
        throw err;
    })
    .catch(err => {
        console.log(err);
        res.status(500);
        res.send(err.sqlMessage);
    })
})

router.put('/:id', async(req, res) => {
    let data = req.body;
    console.log(data);
    db.query('UPDATE customer SET '+
                'firstname = ?, '+ 
                'lastname = ?, '+ 
                'street = ?, '+
                'zip = ?, '+
                'city = ?, '+
                'birthday = ?, '+
                'birthplace = ?, '+
                'phone = ?, '+
                'email = ?, '+
                'avatar = ? '+
                'WHERE id = ?;', [
        data.firstname,
        data.lastname,
        data.street,
        data.zip,
        data.city,
        data.birthday,
        data.birthplace,
        data.phone,
        data.email, 
        data.avatar,
        data.id])
    .then(rows => {
        return db.query('SELECT * FROM customer')
    } )
    .then(rows => {
        res.status(200) ;
        res.send(rows);
    }, err => {
        throw err;
    })
    .catch(err => {
        console.log(err);
        res.status(500);
        res.send(err.sqlMessage);
    })
});

router.delete('/:id', async(req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM customer WHERE id = ?', [id])
    .then(rows => {
        return db.query('SELECT * FROM customer')
    } )
    .then(rows => {
        res.status(200) ;
        res.send(rows);
    }, err => {
        throw err;
    })
    .catch(err => {
        console.log(err);
        res.status(500);
        res.send(err.sqlMessage);
    })
});

module.exports = router;