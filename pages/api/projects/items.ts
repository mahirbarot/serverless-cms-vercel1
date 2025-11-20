import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import Project from '@/models/Project';
import { authenticate, AuthenticatedRequest, corsHandler } from '@/lib/middleware';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (corsHandler(req, res)) return;

  try {
    await connectDB();

    if (req.method === 'GET') {
      const projects = await Project.find().sort({ createdAt: -1 });
      return res.status(200).json(projects);
    }

    if (req.method === 'POST') {
      const {
        project_title,
        project_cover_image,
        project_thumbnail_image,
        project_description,
        project_year,
        project_category,
        project_link,
        project_type,
        project_tags,
      } = req.body;

      if (!project_title || !project_cover_image || !project_year || !project_category || !project_type) {
        return res.status(400).json({ error: 'Required fields are missing' });
      }

      const project = new Project({
        project_title,
        project_cover_image,
        project_thumbnail_image: project_thumbnail_image || '',
        project_description: project_description || '',
        project_year,
        project_category,
        project_link: project_link || 'View Project',
        project_type,
        project_tags: project_tags || [],
      });

      await project.save();

      return res.status(201).json(project);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Projects items error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default authenticate(handler);

