const db = require('./db');

module.exports = {
	authorizeWrite: function ({ email, password} = {}) {
	    const users = await db.select()
	        .from('users')
	        .where('email', req.query.email)
	        .andWhere('password', knex.raw(`crypt(?, password)`, [req.query.password]));
	    const user = users[0];
		if (!user) throw new Error('Invalid email/password combination');
	}
}