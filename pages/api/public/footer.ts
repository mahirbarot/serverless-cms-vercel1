import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import Footer from '@/models/Footer';
import { corsHandler } from '@/lib/middleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (corsHandler(req, res)) return;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    let footer = await Footer.findOne();

    if (!footer) {
      footer = new Footer();
      await footer.save();
    }

    return res.status(200).json(footer);
  } catch (error) {
    console.error('Footer error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

