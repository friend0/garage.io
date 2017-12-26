const db = require('./db');

module.exports = {
	authorizeWrite: async function ({ email, password} = {}) {
	    const users = await db.select()
	        .from('users')
	        .where('email', email)
	        .andWhere('password', db.raw(`crypt(?, password)`, [password]));
	    const user = users[0];
		if (!user) throw new Error('Invalid email/password combination');
	}
}