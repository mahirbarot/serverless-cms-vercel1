import mongoose, { Schema, Document } from 'mongoose';

export interface IFooter extends Document {
  footer_text: string;
  footer_logo?: string;
  footer_links: {
    text: string;
    url: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const FooterLinkSchema: Schema = new Schema({
  text: { type: String, required: true },
  url: { type: String, required: true },
});

const FooterSchema: Schema = new Schema(
  {
    footer_text: { type: String, default: '© 2025 H S Planning Ltd. All rights reserved.' },
    footer_logo: { type: String, default: '' },
    footer_links: { type: [FooterLinkSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Footer || mongoose.model<IFooter>('Footer', FooterSchema);

