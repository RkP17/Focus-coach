const express = require('express'); // to create the server
const cors = require('cors'); // to allow cross-origin requests
const bodyParser = require('body-parser'); // to parse incoming request bodies
require('dotenv').config(); // to read environment variables from a .env file
const {Pool} = require('pg'); // to connect to the PostgreSQL database

//crearte the express app
const app = express();

//middleware
app.use(cors()); // allow cross-origin requests
app.use(bodyParser.json()); // parse incoming request bodies

// set up the server port
const PORT = process.env.PORT || 5000;

// connect to the PostgreSQL database

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
    } else {
      console.log('Connected to the database:', res.rows);
    }
  });