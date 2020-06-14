module.exports = {
    name: 'Add uniques to user table',
    up: async function(client) {
        try {
            await client.query(`BEGIN;`);
            await client.query(`ALTER TABLE users ADD CONSTRAINT login_uniq UNIQUE(login)`);
            await client.query(`ALTER TABLE users ADD CONSTRAINT email_uniq UNIQUE(email)`);
            await client.query(`COMMIT;`);
        }
        catch(err) {
            await client.query(`ROLLBACK;`);
            throw err;
        }
    }
};