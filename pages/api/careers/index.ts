import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import Career from '@/models/Career';
import { authenticate, AuthenticatedRequest, corsHandler } from '@/lib/middleware';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (corsHandler(req, res)) return;

  try {
    await connectDB();

    if (req.method === 'GET') {
      let career = await Career.findOne();

      if (!career) {
        career = new Career();
        await career.save();
      }

      return res.status(200).json(career);
    }

    if (req.method === 'PUT') {
      const { careers_title, careers_description, current_openings_title, openings_list } = req.body;

      let career = await Career.findOne();

      if (!career) {
        career = new Career();
      }

      if (careers_title !== undefined) career.careers_title = careers_title;
      if (careers_description !== undefined) career.careers_description = careers_description;
      if (current_openings_title !== undefined) career.current_openings_title = current_openings_title;
      if (openings_list !== undefined) career.openings_list = openings_list;

      await career.save();

      return res.status(200).json(career);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Careers error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default authenticate(handler);

