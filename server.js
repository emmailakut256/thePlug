
// Dependencies 
const express = require('express');
const pgp = require('pg-promise')(/* options */)  // This is the node js module driver required to connect Postgres with node



// Instantiations
const app = express();
const port = 5000
const db = pgp('postgres://username:password@host:port/database')
db.one('SELECT $1 AS value', 123)
  .then((data) => {
    console.log('DATA:', data.value)
  })
  .catch((error) => {
    console.log('ERROR:', error)
  })

  
// Middleware 

// Routes
app.get('/', (req, res) => {
  res.send('Hello World This is the plug!')
})









app.listen(port, () => {
  console.log(`thePlug is  listening on port ${port}`)
})
