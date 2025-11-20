import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import Admin from '@/models/Admin';
import { comparePassword, generateToken } from '@/lib/auth';
import { corsHandler } from '@/lib/middleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (corsHandler(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await comparePassword(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken({
      userId: admin._id.toString(),
      email: admin.email,
    });

    return res.status(200).json({
      token,
      user: {
        id: admin._id,
        email: admin.email,
        username: admin.username,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

