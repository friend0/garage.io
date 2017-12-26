const express = require('express');
const path = require('path');

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'pi',
        password: 'raspberryPostgres',
        database: 'garage_io'
    }
});

// allows local dev on mac
let Gpio;
try {
    Gpio = require('onoff').Gpio;
} catch (e) {
    console.log(e);
}

const app = express();
const http = require('http');

let controlPin;
if (Gpio) {
    controlPin = new Gpio(14, 'out');
}
const ledPin = new Gpio(15, 'out');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/../client/build')));

// Put all API endpoints under '/api'
app.get('/api/control', (req, res) => {
    let user;
    knex.select()
        .from('users')
        .where('email', req.query.email)
        .andWhere('password', knex.raw(`crypt(?, password)`, [req.query.password]))
        .then((data) => {
            user = data[0];
            if (user) {
                if (controlPin) {
                    controlPin.writeSync(1);
                    ledPin.writeSync(1);
                    setTimeout(() => {
                        ledPin.writeSync(0);
                        controlPin.writeSync(0);
                    }, 500);
                }
                res.json({
                    message: 'Authenticated.',
                    status: 200
                });
            } else {
                console.log('Incorrect email/password combination.');
                res.json({
                    message: 'Incorrect email/password combination.',
                    status: 400
                })
            }
        })
        .catch((err) => {
            console.log('ERR', err)
            console.log('No user with those credentials found.');
            res.json({
                message: 'No user with those credentials found.',
                status: 400
            })
        });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port);
console.log(`Garage.io listening on ${port}`);
