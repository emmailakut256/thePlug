const localStrategy = require('passport-local').Strategy;
const { pool } = require('./dbConfig');
const  bcrypt = require('bcrypt');
const { authenticate } = require('passport');
const { isMatch } = require('lodash');

function initialize(passport){
    const authenticateUser = (email,password,done)=>{
        pool.query(`select * from "Users" where email=$1`,[email],(err,results)=>{
            if(err){
                throw err
            }
            console.log(results.rows);
            if(results.rows.length > 0){
                const user = results.rows[0];
                bcrypt.compare(password,user.password, (err, isMatch)=>{
                    if(err){
                        throw err
                    } 
                    if (isMatch){
                        return done(null, user);
                    } else {
                        return done(null, false, {message:"Password is not correct"})
                    }
                })
            } else {
                return done(null, false, {message: "Email is not registered with us"})
            }
        })
    }
 passport.use(new localStrategy({
    usernameField: "email",
    passwordField: "password",

 }, authenticateUser));

 passport.serializeUser((user, done)=> done(null, user.id)) //Used to store the user id the session cookie
 passport.deserializeUser((id, done)=> {
    pool.query(`select * from "Users" where id=$1`,[id],(err, results)=>{
        if(err){
            throw err
        }
        return done(null, results.rows[0])
    });
 });

}
module.exports = initialize;