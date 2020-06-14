const LocalStrategy = require('passport-local').Strategy;
const db = require('./../db');
const bcrypt = require('bcryptjs');

module.exports = new LocalStrategy(async (username, password, done) => {
    let client = await db.pool.connect();
    let result = await client.query(
        'SELECT id, login, email, password FROM users WHERE login=$1;'
        ,[username]);
    client.release();
    if(result.rows.length && await bcrypt.compare(password, result.rows[0].password)){
        done(null, result.rows[0]);
    }
    else{
        done(null, false);
    }
});
