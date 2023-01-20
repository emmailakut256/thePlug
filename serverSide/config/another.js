const passport = require("passport");
const { Strategy: GoogleStrategy} =require('passport-google-oauth2');
require('dotenv').config();
const express = require('express');
const router = express.Router();
const { pool } = require('./dbConfig');

passport.use(
    new GoogleStrategy ({
    clientID: process.env.CLIENT_ID, 
    clientSecret:process.env.CLIENT_SECRET , 
    callbackURL:process.env.GOOGLE_CALLBACK_URL, 
    }, 
    async (_, __, profile, done)=>{
        
        
        try {
            const account = profile._json;
            console.log(account)
            console.log(account.sub)
            var date = new Date();

            
           const  currentUser =  pool.query(`SELECT * FROM "Users" where google_id = $1`,[account.sub]);
            
            console.log(currentUser);

            if(currentUser.results.rows.length == 0) {

                // create a new user if they dont exist
                await pool.query(`INSERT INTO "Users" (name, email, password, "createdAt", "updatedAt", google_id) VALUES($1,$2,$3,$4,$5,$6)`,
                [account.name, account.sub, account.sub, date, date, account.sub ])
            }
           
            // user exists
            
        } catch (error) {
            done(error)
        }
        done(null, user)
    }
   
));


passport.serializeUser((user, done)=>{
    // loads authenticated user object and attaches it to into req.session.passport.user
    done(null,user);
});

passport.deserializeUser((user, done)=>{
    // loads the serialized authenticated object and attaches it to req.user
    done(null,user)
})



module.exports = router ;

