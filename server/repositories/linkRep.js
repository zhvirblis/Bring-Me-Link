module.exports = class UserRep {
    constructor(client) {
        this.client = client;
    }

    async insertLink(link, userId) {
        return await this.client.query(
            'INSERT INTO links (name, link, user_id) VALUES ($1, $2, $3);',
            [link.slice(0,400), link, userId]);
    }

    async listLink(userId) {
        console.log('US', userId, )
        return await this.client.query('SELECT id, name, link FROM links WHERE user_id=$1', [userId]);
    }
};