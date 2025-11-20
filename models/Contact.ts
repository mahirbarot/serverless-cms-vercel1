import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
  contact_title: string;
  contact_form_name_placeholder: string;
  contact_form_email_placeholder: string;
  contact_form_message_placeholder: string;
  contact_submit_button_text: string;
  contact_email: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema: Schema = new Schema(
  {
    contact_title: { type: String, default: 'Get in Touch' },
    contact_form_name_placeholder: { type: String, default: 'Your Name' },
    contact_form_email_placeholder: { type: String, default: 'Your Email' },
    contact_form_message_placeholder: { type: String, default: 'Your Message' },
    contact_submit_button_text: { type: String, default: 'Send Message' },
    contact_email: { type: String, default: 'hsplanningltd@yahoo.com' },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);

