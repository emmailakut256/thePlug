
// Dependencies 
const express = require('express');
const {Client}= require('pg');





// Instantiations
const app = express();
const port = 5000

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "cnkm9894T",
  database: "postgres"
});


client.connect();


client.query(`select *  from users`, (res,err)=>{
  if(!err){
    console.log(res.rows);
  } else {
    console.log(err.message);
  }
  client.end;
})

  
// Middleware 

// Routes
app.get('/', (req, res) => {
  res.send('Hello World This is the plug!')
})









app.listen(port, () => {
  console.log(`thePlug is  listening on port ${port}`)
})
