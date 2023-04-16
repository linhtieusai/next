import mysql from 'mysql2/promise';
import { useRouter } from 'next/router';

export default async function handler(req, res) {
 
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'caunoitot',
  });

  const [rows] = await connection.query(`
    SELECT * FROM job
    ORDER BY id DESC`);

  const jobs = rows.map((row) => ({
    id: row.id,
  }));

  await connection.end();

  res.status(200).json(jobs);
}