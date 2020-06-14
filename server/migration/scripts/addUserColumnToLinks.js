module.exports = {
    name: 'Add user column to links table',
    up: async function(client) {
        try {
            await client.query(`ALTER TABLE links ADD COLUMN user_id INTEGER REFERENCES users(id) NOT NULL`);
        }
        catch(err) {
            throw err;
        }
    }
};