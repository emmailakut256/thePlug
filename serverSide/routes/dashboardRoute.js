const express = require('express');
const router = express.Router();

const passport = require('passport');

// Writing a route
router.get('/dashboard',(req,res)=>{
    // console.log('',req.session.user)
    res.render('dashboard',{user: req.user.name});
    
});

module.exports = router;