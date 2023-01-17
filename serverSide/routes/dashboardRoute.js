const express = require('express');
const router = express.Router();

const passport = require('passport');

const { pool }= require('../config/dbConfig');

const app = express();

const initializePassport = require('../config/passportConfig');

initializePassport(passport);  


// Middleware to check if someone accessing the dashbaord is logged in
function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
     res.redirect('/login');
}

app.use(passport.initialize());
app.use(passport.session());

// Writing a route
router.get('/dashboard', checkNotAuthenticated,  (req,res)=>{
    // console.log('',req.session.user)
    res.render('dashboard',{user: req.user.name});
    
});

module.exports = router;