const db = require('../db');

const migrations = [
    require('./scripts/userTable.js'),
    require('./scripts/links.js'),
    require('./scripts/addPrimaryKeyToUsers'),
    require('./scripts/addUserColumnToLinks'),
    require('./scripts/addUserUnique')
];
migrations.forEach(async (elem) => {
    let client = await db.pool.connect();
    try {
        await client.query('BEGIN;');
        let result = (await client.query('SELECT name FROM migration WHERE name = $1', [ 
            elem.name 
        ])).rows.length;
        if(!result) {
            await elem.up(client);
            await client.query('INSERT INTO migration (name, date) VALUES ($1, NOW())', [
                elem.name
            ]);
            console.log(elem.name +' - Done');
        }
        await client.query('COMMIT');
    }
    catch(err) {
        await client.query('ROLLBACK;');
        console.log(elem.name +' - Err!');
        console.log(err);
        client.end();
    }
    client.end();
});

