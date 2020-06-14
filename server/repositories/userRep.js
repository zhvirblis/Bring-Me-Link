module.exports = class UserRep {
    constructor(client) {
        this.client = client;
    }

    async insertUser(login, email, hash) {
        return await this.client.query(
            'INSERT INTO users (login, email, password) VALUES ($1, $2, $3);',
            [login, email, hash]);
    }
    
    async userAlreadyExist(login) {
        return await this.client.query('SELECT id FROM users WHERE login=$1');
    }
};
