const express = require('express');
const path = require('path');

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'pi',
    password : 'raspberryPostgres',
    database : 'garage_io'
  }
});

console.log('KNEX', knex.select().from('users').then((data) => {
    for (const row of data){ console.log(row)}
}))
// allows local dev on mac
let Gpio;
try {
    Gpio = require('onoff').Gpio;
}
catch (e) {
    console.log(e);
}

const app = express();
const http = require('http');

let controlPin;
if (Gpio){
    controlPin = new Gpio(2, 'out');
}

const password = 'HoldTheDoor';

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/../client/build')));

// Put all API endpoints under '/api'
app.get('/api/control', (req, res) => {
    console.log('Received request');
    console.log(`Received password: ${password}`);
    try {
        if (req.query.password && req.query.password === password) {
            console.log(`Received password: ${password}`);
            if (controlPin) {
                controlPin.writeSync(1);
                setTimeout(()=>{
                    controlPin.writeSync(0);
                }, 500);
            }
            res.json({ status: 200 });
        }
        else {
            res.json({ status: 400 })
        }
    }
    catch (e) {
        res.json({ status: 400 })
    }
    console.log('responded to request...');
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/../client/build/index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port);
console.log(`Garage.io listening on ${port}`);