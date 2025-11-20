import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import About from '@/models/About';
import { authenticate, AuthenticatedRequest, corsHandler } from '@/lib/middleware';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (corsHandler(req, res)) return;

  try {
    await connectDB();

    if (req.method === 'GET') {
      let about = await About.findOne();

      if (!about) {
        about = new About();
        await about.save();
      }

      return res.status(200).json(about);
    }

    if (req.method === 'PUT') {
      const {
        about_title,
        about_sub_title,
        about_description,
        about_vision_title,
        about_vision_description,
        about_approach_title,
        about_approach_description,
        about_image,
      } = req.body;

      let about = await About.findOne();

      if (!about) {
        about = new About();
      }

      if (about_title !== undefined) about.about_title = about_title;
      if (about_sub_title !== undefined) about.about_sub_title = about_sub_title;
      if (about_description !== undefined) about.about_description = about_description;
      if (about_vision_title !== undefined) about.about_vision_title = about_vision_title;
      if (about_vision_description !== undefined) about.about_vision_description = about_vision_description;
      if (about_approach_title !== undefined) about.about_approach_title = about_approach_title;
      if (about_approach_description !== undefined) about.about_approach_description = about_approach_description;
      if (about_image !== undefined) about.about_image = about_image;

      await about.save();

      return res.status(200).json(about);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('About error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default authenticate(handler);

