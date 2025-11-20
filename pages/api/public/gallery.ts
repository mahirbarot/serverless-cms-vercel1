import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import Gallery from '@/models/Gallery';
import { corsHandler } from '@/lib/middleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (corsHandler(req, res)) return;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    let gallery = await Gallery.findOne();

    if (!gallery) {
      gallery = new Gallery();
      await gallery.save();
    }

    return res.status(200).json(gallery);
  } catch (error) {
    console.error('Gallery error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

