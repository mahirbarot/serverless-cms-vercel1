import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import Hero from '@/models/Hero';
import { corsHandler } from '@/lib/middleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (corsHandler(req, res)) return;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    let hero = await Hero.findOne();

    if (!hero) {
      hero = new Hero();
      await hero.save();
    }

    return res.status(200).json(hero);
  } catch (error) {
    console.error('Hero error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

