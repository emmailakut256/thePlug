
// Dependencies 
const express = require('express');  //This is the express 
const { pool }= require('./config/dbConfig');  //This is for postgres db connection
const session = require('express-session');
const { Sequelize } = require('sequelize');
const flash = require('express-flash');
const passport = require('passport');
const initializePassport = require('./config/passportConfig');



// const { Client } = require('pg');



// Instantiations
const app = express();
const port = process.env.PORT || 5000
initializePassport(passport);  

// const client = new Client({
//   host: "localhost",
//   user: "postgres",
//   port: 5432,
//   password: "cnkm9894T",
//   database: "postgres"
// });


// pool.connect()  //Establishing a connection to the DB
// .then(()=> console.log('Connected to the DB Successfully'))
// .catch(e => console.log(e))
// .finally( ()=> client.end()) //Use the finally to end the connection



// importing the Route files
const registerRoutes = require('./routes/registerRoute');
const dashboardRoutes = require('./routes/dashboardRoute');
const loginRoutes = require('./routes/loginRoute');


  
// Middleware
// Telling the server to set  the view engine as ejs
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.urlencoded({ extended: false })); // This middleware allows us to send data from the front end to the backend
app.use(flash());

app.use(session({
  secret:'This is a secret',
  saveUninitialized: false,
  resave:false,
  cookie: {maxAge: 30 * 24 * 60 * 60 * 1000, // 1 month
  },
  
}));

app.use(passport.initialize());
app.use(passport.session());



// Routes
app.use('/', registerRoutes);
app.use('/', dashboardRoutes);
app.use('/', loginRoutes);




app.get('/', (req, res) => {
  res.send('Hello World This is the plug!')
});

// For invalid routes
app.get('*', (req, res) => {
  res.send('404! This is an invalid URL.');
});

app.listen(port, () => {
  console.log(`thePlug is  listening on port ${port}`)
})
