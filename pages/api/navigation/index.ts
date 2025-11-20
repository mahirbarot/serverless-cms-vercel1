import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import Navigation from '@/models/Navigation';
import { authenticate, AuthenticatedRequest, corsHandler } from '@/lib/middleware';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (corsHandler(req, res)) return;

  try {
    await connectDB();

    if (req.method === 'GET') {
      let navigation = await Navigation.findOne();

      if (!navigation) {
        navigation = new Navigation();
        await navigation.save();
      }

      return res.status(200).json(navigation);
    }

    if (req.method === 'PUT') {
      const {
        menu_home,
        menu_about,
        menu_services,
        menu_projects,
        menu_gallery,
        menu_careers,
        menu_contact,
      } = req.body;

      let navigation = await Navigation.findOne();

      if (!navigation) {
        navigation = new Navigation();
      }

      if (menu_home !== undefined) navigation.menu_home = menu_home;
      if (menu_about !== undefined) navigation.menu_about = menu_about;
      if (menu_services !== undefined) navigation.menu_services = menu_services;
      if (menu_projects !== undefined) navigation.menu_projects = menu_projects;
      if (menu_gallery !== undefined) navigation.menu_gallery = menu_gallery;
      if (menu_careers !== undefined) navigation.menu_careers = menu_careers;
      if (menu_contact !== undefined) navigation.menu_contact = menu_contact;

      await navigation.save();

      return res.status(200).json(navigation);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Navigation error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default authenticate(handler);

