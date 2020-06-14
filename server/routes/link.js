const express = require('express');
const db = require('./../db');
const router = express.Router();
const conf = require('./../conf');
const ejwt = require('express-jwt');
const LinkRep = require('../repositories/linkRep.js');

module.exports = function(io) {
    router.post('/api/link', ejwt({secret: conf.secret}), async function(req, res){
        console.log('DEBUG:', req.body);
        let client = await db.pool.connect();
        let linkRep = new LinkRep(client);
        try{
            await linkRep.insertLink(req.body.link, req.user.id);
            io.to('user_room'+req.user.id).emit('newLink', {name: req.body.link, link: req.body.link, tid: req.body.tid});
            return res.json({status: 'ok'});
        }
        catch(err){
            return res.status(500).json({message:err.message});
        }
    });

    router.get('/api/link', ejwt({secret: conf.secret}), async function(req, res){
        try{
            let client = await db.pool.connect();
            let linkRep = new LinkRep(client);
            let linkList = (await linkRep.listLink(req.user.id)).rows;
            return res.json(linkList);
        }
        catch(err){
            return res.status(500).json({message:err.message});
        }
    });

    return router;
}
