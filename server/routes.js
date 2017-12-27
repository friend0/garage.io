const db = require('./db');
const auth = require('./auth');
const hardware = require('./hardware');
const express = require('express'),
    router = express.Router();

const winston = require('winston'),
    expressWinston = require('express-winston');

const logger = winston.createLogger({
    json: true,
    colorize: true,
  transports: [
    new winston.transports.Console(),
  ]
});


const asyncMiddleware = fn =>
    (req, res, next) => {
        Promise.resolve(fn(req, res, next))
            .catch(next);
    };

const loggerMiddleware =
    (req, res, next) => {
        logger.info({ method: req.method, time: Date.now()});
        next();
    };

router.use(loggerMiddleware);

router.get('/api/control', asyncMiddleware(async (req, res) => {
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
}));


router.post('/api/users', asyncMiddleware(async (req, res, next) => {
    /* 
      if there is an error thrown in getUserFromDb, asyncMiddleware
      will pass it to next() and express will handle the error;
    */
    const insertResults = await db('users').insert({email: req.body.email, password: req.body.password}).returning('*');
    // logger.info(insertResults)
    res.json({ status: 200 });
}));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
router.get('*', async (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});



module.exports = router;