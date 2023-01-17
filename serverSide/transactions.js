const {Client} = require('pg')

const client = new Client( {
    host: "localhost",
    database: "postgres",
    password: "cnkm9894T",
    user: "postgres",
    port: 5432
})

execute()

async function execute(){
    try {
    await client.connect();
    await client.query("BEGIN")
    await client.query("insert into users values($1,$2,$3)", [23,'Matoba','Makain'])

    console.log('inserted a new row');
    await client.query("COMMIT")

    } catch(ex){
        console.log(`There was an error ${ex}`);
        await client.query("ROLLBACK")
    } finally{
        await client.end()
    }
    

}