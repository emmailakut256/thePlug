const express = require('express');
const router = express.Router();
const { pool }= require('../config/dbConfig');  //This is for postgres db connection
const flash = require('express-flash');


const bcrypt = require('bcrypt');
const { now } = require('lodash');


// Instantiation of express
const app = express();

//Middleware For flash messages
app.use(flash());

function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
      return res.redirect('/dashboard');
    }
    next();
  }

// Writing a route
router.get('/home',(req,res)=>{
    // console.log('',req.session.user)
    res.render('index');
});

router.get('/register',checkAuthenticated,(req,res)=>{
    // console.log('',req.session.user)
    res.render('register');
});

router.post('/register',async (req,res)=>{
    let { name, email, password, password2 } = req.body;
    console.log ({
        name,
        email,
        password,
        password2

    });

    let errors = [];

    // Form validation is happening here
    if(!name || !password || !email || !password2){
        errors.push({message: "please enter all fields"});
    }  

    if(password.length < 6 ){
        errors.push({message: "Passwords should be atleast 6 characters"});
    }

    if(password != password2){
        errors.push({message:"Passwords do not match!"});
    }

    if(errors.length>0){
        res.render('register',{errors})
    } else {
        // Form validation has passed
        let hashedPassword = await bcrypt.hash('password', 10);
        console.log(hashedPassword);
        
        pool.query(  
            `select * from "Users" where email = $1`,[email],(err,results)=>{
            if(err){
                throw err
            }
            
                console.log(results.rows);
                if(results.rows.length > 0){
                    errors.push({message: "Email already exits..Use Another Please"});
                    res.render('register',{errors});
                } else {
                    var currentDate = new Date();
                    pool.query(`insert into "Users" (name,email,password,"createdAt","updatedAt")
                     values($1,$2,$3,$4,$5)
                     returning id,password`, [name,email,hashedPassword,currentDate,currentDate],(err,results)=>{
                        if(err){
                            throw err
                        } 
                            console.log(results.rows);
                            req.flash("success_msg", "You have been successfully registered. Please login")
                            res.redirect('login')
                        }
                    );

                }
            
        } )
    }
});



module.exports = router