module.exports = {
    name: 'Create User Table',
    up: async function(client) {
        try {
            await client.query(`CREATE TABLE users (
                id SERIAL,
                login VARCHAR(200),
                email VARCHAR(200),
                password VARCHAR(400)
             )`);
             await client.query(`INSERT INTO public.users
             (login, email, password)
             VALUES('admin', 'admin@admin.com', '$2a$04$zGBDpTfC.6KHwJE33scpmuFFA/WiF.Oum0Yz2xtDlDCx6iWTVMS9u');
             `);
        }
        catch(err) {
            throw err;
        }
    }
};
