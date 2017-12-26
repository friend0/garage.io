const db = require('./db');
const auth = require('./auth');
const hardware = require('./hardware');

module.exports = function(app) {

    debugger;
    // Put all API endpoints under '/api'
    app.get('/api/control', async (req, res) => {
        try {
            await auth.authorizeWrite({
                email: req.query.email,
                password: req.query.password,
            });

            if (hardware.controlPin) {
                hardware.controlPin.writeSync(1);
                hardware.ledPin.writeSync(1);
                setTimeout(() => {
                    hardware.ledPin.writeSync(0);
                    hardware.controlPin.writeSync(0);
                }, 500);
            }
            res.json({
                message: 'Authenticated.',
                status: 200
            });

        } catch (e) {
            console.log('There was an error handling this request', e)
            res.json({
                message: 'There was an error handling this request.',
                status: 400
            })
        }
    });

    // The "catchall" handler: for any request that doesn't
    // match one above, send back React's index.html file.
    app.get('*', async (req, res) => {
        res.sendFile(path.join(__dirname + '/../client/build/index.html'));
    });

}