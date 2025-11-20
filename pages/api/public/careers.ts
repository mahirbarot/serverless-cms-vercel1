import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import Career from '@/models/Career';
import { corsHandler } from '@/lib/middleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (corsHandler(req, res)) return;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    let career = await Career.findOne();

    if (!career) {
      career = new Career();
      await career.save();
    }

    return res.status(200).json(career);
  } catch (error) {
    console.error('Careers error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

