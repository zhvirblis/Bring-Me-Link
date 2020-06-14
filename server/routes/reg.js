const express = require('express');
const router = express.Router();
const {loginChecker, emailChecker} = require('./../logic/regexps/reg-checkers');
const db = require('./../db');
const bcrypt = require('bcryptjs');
const UserRep = new require('../repositories/userRep.js');

router.post('/api/reg', async (req, res) => {
    let body = req.body;
    if(!body.login || !loginChecker(body.login)){
        return res.status(403).json({status:'error', message:'Login incorect'});
    }
    if(!body.email || !emailChecker(body.email)){
        return res.status(403).json({status:'error', message:'Email incorect'});
    }
    if(body.password<4){
        return res.status(403).json({status:'error', message:'Password < 4'});
    }
    if(body.password !== body.password2){
        return res.status(403).json({status:'error', message:'Password2 != Password'});
    }
    let hash = await bcrypt.hash(body.password, 4);
    let client = await db.pool.connect();
    let userRep = new UserRep(client);
    try{
        await client.query('BEGIN;');
        await userRep.insertUser(body.login, body.email, hash);
        await client.query('COMMIT;');
        return res.json({status: 'ok'});
    }
    catch(err){
        client.query('ROLLBACK;');
        return res.status(403).json({status:'error', message:err.message});
    }
});

module.exports = router;
