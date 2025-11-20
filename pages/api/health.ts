import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import { corsHandler } from '@/lib/middleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (corsHandler(req, res)) return;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();
    return res.status(200).json({ 
      status: 'ok', 
      message: 'API is running',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return res.status(500).json({ 
      status: 'error', 
      message: 'Database connection failed',
      timestamp: new Date().toISOString()
    });
  }
}

