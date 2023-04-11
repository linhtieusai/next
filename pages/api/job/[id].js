import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  // Extract the job ID from the request parameters
  const { id } = req.query;

  // Create a new MySQL connection pool
  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'caunoitot_job',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Execute a query to retrieve the job with the given ID
    const [rows, fields] = await connection.execute(
      'SELECT * FROM job WHERE id = ?',
      [id]
    );

    // Release the connection back to the pool
    connection.release();

    // If a job was found, send its details as the response
    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      // Otherwise, send a 404 error response
      res.status(404).json({ error: `Job with ID ${id} not found` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to load job details from database' });
  } finally {
    // End the connection pool when the request is finished
    pool.end();
  }
}
