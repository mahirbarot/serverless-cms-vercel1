import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import About from '@/models/About';
import { corsHandler } from '@/lib/middleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (corsHandler(req, res)) return;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    let about = await About.findOne();

    if (!about) {
      about = new About();
      await about.save();
    }

    return res.status(200).json(about);
  } catch (error) {
    console.error('About error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

