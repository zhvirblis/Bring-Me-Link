const express = require('express');
const router = express.Router();
const conf = require('./../conf');
const local = require('./../passport');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const ejwt = require('express-jwt');

passport.use(local);

/* GET home page. */
router.post('/api/login', function(req, res, next) {
    console.log('Work');
    passport.authenticate('local', function(err, user) {
        if(err){
            return next(err); 
        }	
        if(!user){
            return res.status(401).json({ status: 'error', code: 'unauthorized' });
        } else {
            return res.json({ 
                status: 'ok',
                token: jwt.sign({id: user.id}, conf.secret)
            });
        }
    })(req, res, next);
});
router.get('/api/foruser', ejwt({secret: conf.secret}), function(req, res){
    res.json({ok:'ok'});
});
module.exports = router;
