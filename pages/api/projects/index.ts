import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import Projects from '@/models/Projects';
import { authenticate, AuthenticatedRequest, corsHandler } from '@/lib/middleware';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (corsHandler(req, res)) return;

  try {
    await connectDB();

    if (req.method === 'GET') {
      let projects = await Projects.findOne();

      if (!projects) {
        projects = new Projects();
        await projects.save();
      }

      return res.status(200).json(projects);
    }

    if (req.method === 'PUT') {
      const { projects_title, projects_subtitle, view_all_projects_link } = req.body;

      let projects = await Projects.findOne();

      if (!projects) {
        projects = new Projects();
      }

      if (projects_title !== undefined) projects.projects_title = projects_title;
      if (projects_subtitle !== undefined) projects.projects_subtitle = projects_subtitle;
      if (view_all_projects_link !== undefined) projects.view_all_projects_link = view_all_projects_link;

      await projects.save();

      return res.status(200).json(projects);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Projects error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default authenticate(handler);

