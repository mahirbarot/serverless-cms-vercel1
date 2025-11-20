import mongoose, { Schema, Document } from 'mongoose';

export interface IAbout extends Document {
  about_title: string;
  about_sub_title: string;
  about_description: string;
  about_vision_title: string;
  about_vision_description: string;
  about_approach_title: string;
  about_approach_description: string;
  about_image: string;
  createdAt: Date;
  updatedAt: Date;
}

const AboutSchema: Schema = new Schema(
  {
    about_title: { type: String, default: 'About Us' },
    about_sub_title: { type: String, default: 'Bedroom Design' },
    about_description: { type: String, default: '' },
    about_vision_title: { type: String, default: 'Our Vision' },
    about_vision_description: { type: String, default: '' },
    about_approach_title: { type: String, default: 'Our Approach' },
    about_approach_description: { type: String, default: '' },
    about_image: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.About || mongoose.model<IAbout>('About', AboutSchema);

