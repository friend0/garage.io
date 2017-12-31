const db = require("./db");
const auth = require("./auth");
const hardware = require("./hardware");
const express = require("express");
const router = express.Router();
const path = require('path');
const winston = require("winston");

const logger = winston.createLogger({
    json: true,
    colorize: true,
    transports: [new winston.transports.Console()]
});

const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const loggerMiddleware = (req, res, next) => {
    logger.info({ method: req.method, time: Date.now() });
    next();
};

router.use(loggerMiddleware);

router.get(
    "/api/control",
    asyncMiddleware(async (req, res) => {
        try {
            await auth.authorizeWrite({
                email: req.query.email,
                password: req.query.password
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
                message: "Authenticated.",
                status: 200
            });
        } catch (e) {
            console.log("There was an error handling this request", e);
            res.json({
                message: "There was an error handling this request.",
                status: 400
            });
        }
    })
);

router.post(
    "/api/users",
    asyncMiddleware(async (req, res) => {
        await db("users")
            .insert({ email: req.body.email, password: db.raw("crypt(?, gen_salt('bf'))", [req.body.password])})
            .returning("*");
        res.json({ status: 200 });
    })
);


router.get("*", async (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
});

module.exports = router;
