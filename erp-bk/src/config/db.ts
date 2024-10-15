import mysql from 'mysql2/promise';

// Create a connection pool
const pool = mysql.createPool({
  connectionLimit: 1500,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Event listener for connection events
pool.on('connection', (connection) => {
  console.log('DB connection established');

  connection.on('error', (err) => {
    console.error('Database connection error:', err);
  });

});

export default pool;