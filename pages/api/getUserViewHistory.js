import mysql from 'mysql2/promise';
import { useRouter } from 'next/router';
import { setTimeout } from 'timers';

export default async function handler(req, res) {
  const query = req.query;
  const { page } = query;

  const limit = 10
  const offset = (page - 1) * limit;

  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'caunoitot',
  });

  const [rows] = await connection.query(`
    SELECT * FROM job
    ORDER BY id DESC
    LIMIT ? OFFSET ?
  `, [limit, offset]);

  const jobs = rows.map((row) => (row));

  const [countRows] = await connection.query(`
    SELECT COUNT(*) as count FROM job
  `);

  const totalJobs = countRows[0].count;
  const totalPages = Math.ceil(totalJobs / limit);

  await connection.end();

  res.status(200).json({
    jobs,
    page: parseInt(page),
    totalPages,
  });
}