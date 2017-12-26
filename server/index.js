const express = require('express');
const path = require('path');
const routes = require('./routes');
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
routes(app);

const port = process.env.PORT || 3001;
app.listen(port);
console.log(`Garage.io listening on ${port}`);