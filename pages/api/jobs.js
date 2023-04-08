import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  // Create a new MySQL connection pool
  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'caunoitot',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Execute a query to retrieve all jobs from the job table
    const [rows, fields] = await connection.execute('SELECT * FROM job');

    // Release the connection back to the pool
    connection.release();

    // Send the list of jobs as the response
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to load jobs from database' });
  } finally {
    // End the connection pool when the request is finished
    pool.end();
  }
}