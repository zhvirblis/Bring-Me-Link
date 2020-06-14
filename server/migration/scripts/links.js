module.exports = {
    name: 'Create Links Table',
    up: async function(client) {
        try {
            await client.query(`CREATE TABLE links (
                id SERIAL,
                name VARCHAR(400),
                link TEXT
             )`);
        }
        catch(err) {
            throw err;
        }
    }
};