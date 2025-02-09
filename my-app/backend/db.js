// pg libary allows me to communicate between the node.js server and the postgresql database
// dotenv helps me to store sensitive info !! DO NOT USE VERSION CONTROL TO STORE SENSITIVE INFO

const {Pool} = require('pg'); // importing the pool module from the pg package
require ('dotenv').config(); // importing the dotenv package to read environment variables from a .env file

// creating a new pool object

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // from my.env file 
});

