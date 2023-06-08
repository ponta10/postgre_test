import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const result = await pool.query('SELECT * FROM todo ORDER BY id ASC');
    res.status(200).json(result.rows);
  }

  if (req.method === 'POST') {
    const { task } = req.body;
    const result = await pool.query('INSERT INTO todo (task) VALUES($1) RETURNING *', [task]);
    res.status(200).json(result.rows[0]);
  }
};