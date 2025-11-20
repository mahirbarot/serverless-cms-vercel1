import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import Contact from '@/models/Contact';
import { authenticate, AuthenticatedRequest, corsHandler } from '@/lib/middleware';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (corsHandler(req, res)) return;

  try {
    await connectDB();

    if (req.method === 'GET') {
      let contact = await Contact.findOne();

      if (!contact) {
        contact = new Contact();
        await contact.save();
      }

      return res.status(200).json(contact);
    }

    if (req.method === 'PUT') {
      const {
        contact_title,
        contact_form_name_placeholder,
        contact_form_email_placeholder,
        contact_form_message_placeholder,
        contact_submit_button_text,
        contact_email,
      } = req.body;

      let contact = await Contact.findOne();

      if (!contact) {
        contact = new Contact();
      }

      if (contact_title !== undefined) contact.contact_title = contact_title;
      if (contact_form_name_placeholder !== undefined) contact.contact_form_name_placeholder = contact_form_name_placeholder;
      if (contact_form_email_placeholder !== undefined) contact.contact_form_email_placeholder = contact_form_email_placeholder;
      if (contact_form_message_placeholder !== undefined) contact.contact_form_message_placeholder = contact_form_message_placeholder;
      if (contact_submit_button_text !== undefined) contact.contact_submit_button_text = contact_submit_button_text;
      if (contact_email !== undefined) contact.contact_email = contact_email;

      await contact.save();

      return res.status(200).json(contact);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Contact error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default authenticate(handler);

