import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit :10,
    queueLimit:0,
});

pool.getConnection()
.then((response)=>{
 console.log("connected to database" +
     response.config.database);
     pool.releaseConnection(response);
})
.catch((error)=>
    console.error("error while connectigg to the database "+
       error.message)
    
    );

export default pool;