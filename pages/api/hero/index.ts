import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import Hero from '@/models/Hero';
import { authenticate, AuthenticatedRequest, corsHandler } from '@/lib/middleware';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (corsHandler(req, res)) return;

  try {
    await connectDB();

    if (req.method === 'GET') {
      let hero = await Hero.findOne();

      if (!hero) {
        hero = new Hero();
        await hero.save();
      }

      return res.status(200).json(hero);
    }

    if (req.method === 'PUT') {
      const { hero_title, hero_subtitle, hero_background_image, hero_tagline } = req.body;

      let hero = await Hero.findOne();

      if (!hero) {
        hero = new Hero();
      }

      if (hero_title !== undefined) hero.hero_title = hero_title;
      if (hero_subtitle !== undefined) hero.hero_subtitle = hero_subtitle;
      if (hero_background_image !== undefined) hero.hero_background_image = hero_background_image;
      if (hero_tagline !== undefined) hero.hero_tagline = hero_tagline;

      await hero.save();

      return res.status(200).json(hero);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Hero error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default authenticate(handler);

