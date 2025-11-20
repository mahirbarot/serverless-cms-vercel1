import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import Gallery from '@/models/Gallery';
import { authenticate, AuthenticatedRequest, corsHandler } from '@/lib/middleware';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (corsHandler(req, res)) return;

  try {
    await connectDB();

    if (req.method === 'GET') {
      let gallery = await Gallery.findOne();

      if (!gallery) {
        gallery = new Gallery();
        await gallery.save();
      }

      return res.status(200).json(gallery);
    }

    if (req.method === 'PUT') {
      const { gallery_title, gallery_images } = req.body;

      let gallery = await Gallery.findOne();

      if (!gallery) {
        gallery = new Gallery();
      }

      if (gallery_title !== undefined) gallery.gallery_title = gallery_title;
      if (gallery_images !== undefined) gallery.gallery_images = gallery_images;

      await gallery.save();

      return res.status(200).json(gallery);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Gallery error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default authenticate(handler);

