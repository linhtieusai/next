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
  // `, [`%${query}%`, limit, offset]);

  const jobs = rows.map((row) => (row));

  // const jobs = rows.map((row) => ({
  //   id: row.id,
  //   title: row.title,
  //   location: row.location,
  //   preferred_skill: row.preferred_skill,
  //   job_responsibility: row.job_responsibility,
  //   description: row.description,
  //   gross_month_salary: row.gross_month_salary,
  //   source_site: row.source_site,
  //   source_id: row.source_id,
  //   job_location: row.job_location,
    
  // }));


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