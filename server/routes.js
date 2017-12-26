
module.exports = function(app, knex) {

    // Put all API endpoints under '/api'
    app.get('/api/control', async (req, res) => {
        try {
            const users = await knex.select()
                .from('users')
                .where('email', req.query.email)
                .andWhere('password', knex.raw(`crypt(?, password)`, [req.query.password]));
            const user = users[0];
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