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

// knex.select().from('users').then((data) => {
//     console.log('knex responses (', data.length, '):');
//     for (const row of data) {
//         console.log(row)
//     }
// })

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
    controlPin = new Gpio(2, 'out');
}

const password = 'HoldTheDoor';

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/../client/build')));

// Put all API endpoints under '/api'
app.get('/api/control', (req, res) => {
    console.log('REQUEST')
    console.log(req.query)

    let user;
    console.log(knex.select()
        .from('users')
        .where('email', knex.raw(req.query.email))
        .andWhere('password', knex.raw(`crypt(${req.query.password}, password)`)).toSQL())
    knex.select()
        .from('users')
        .where('email', req.query.email)
        .andWhere('password', knex.raw(`crypt(${req.query.password}, password)`))
        .then((data) => {
            user = data[0];
            console.log('FOUND USER', user)
            if (user && user.email === 'empireryan@gmail.com') {
                if (user.email === res.query.email) {
                    console.log(`Received password: ${password}`);
                    if (controlPin) {
                        controlPin.writeSync(1);
                        setTimeout(() => {
                            controlPin.writeSync(0);
                        }, 500);
                    }
                    res.json({
                        message: 'Authenticated',
                        status: 200
                    });
                }

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
