const knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'pi',
        password: 'raspberryPostgres',
        database: 'garage_io'
    }
});

module.exports = knex;