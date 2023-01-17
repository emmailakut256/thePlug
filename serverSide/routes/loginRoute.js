const express = require('express');
const passport = require('passport');

const router = express.Router();
const initializePassport = require('./config/passportConfig');

initializePassport(passport);  


router.get('/login', (req, res)=> {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect:'/login',
    failureFlash: true
 }),(req,res)=>{

 } 
);

app.use(passport.initialize());
app.use(passport.session());

    
module.exports = router;