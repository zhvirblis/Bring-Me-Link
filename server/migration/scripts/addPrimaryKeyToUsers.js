module.exports = {
    name: 'Add primary key to users table',
    up: async function(client) {
        try {
            await client.query(`ALTER TABLE users ADD PRIMARY KEY (id)`);
        }
        catch(err) {
            throw err;
        }
    }
};