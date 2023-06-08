import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgresql://root:password@localhost:5432/todoapp',
});

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await pool.query('SELECT * FROM todo ORDER BY id ASC');
  res.status(200).json(result.rows);
};

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { task } = req.body;
  const result = await pool.query('INSERT INTO todo (task) VALUES($1) RETURNING *', [task]);
  res.status(200).json(result.rows[0]);
};
