import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import Footer from '@/models/Footer';
import { authenticate, AuthenticatedRequest, corsHandler } from '@/lib/middleware';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (corsHandler(req, res)) return;

  try {
    await connectDB();

    if (req.method === 'GET') {
      let footer = await Footer.findOne();

      if (!footer) {
        footer = new Footer();
        await footer.save();
      }

      return res.status(200).json(footer);
    }

    if (req.method === 'PUT') {
      const { footer_text, footer_logo, footer_links } = req.body;

      let footer = await Footer.findOne();

      if (!footer) {
        footer = new Footer();
      }

      if (footer_text !== undefined) footer.footer_text = footer_text;
      if (footer_logo !== undefined) footer.footer_logo = footer_logo;
      if (footer_links !== undefined) footer.footer_links = footer_links;

      await footer.save();

      return res.status(200).json(footer);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Footer error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default authenticate(handler);

