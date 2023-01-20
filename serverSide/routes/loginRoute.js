const express = require('express');
const passport = require('passport');
const app = express();
const { pool }= require('../config/dbConfig');  //This is for postgres db connection
const flash = require('express-flash');


const router = express.Router();
const initializePassport = require('../config/passportConfig');

initializePassport(passport);  

app.use(flash());

// Middleware to check if the person accessing login is authenticated
// function checkAuthenticated(req, res, next){
//     if(req.isAuthenticated()){
//       return res.redirect('/dashboard');
//     }
//     next();
// }

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


router.get('/google', passport.authenticate('google',{
    scope: ['email', 'profile']
}  ));

router.get('/auth/google/callback', passport.authenticate('google',{
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}  ));


router.get('/logout', (req, res)=> {

    req.logOut((err)=>{
        if(err){
            return next(err);
        }

    req.flash("success_msg","You have logged out")
    res.redirect('/login');
    });
    
    
});


    
module.exports = router;