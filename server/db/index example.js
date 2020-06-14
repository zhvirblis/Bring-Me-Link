const { Pool } = require('pg');

module.exports = {
    pool: new Pool({
        host: 'HOST_ADDRESS',
        database: 'DB_NAME',
        user: 'USER_NAME',
        password: 'USER PASS',
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    })
}