import mongoose, { Schema, Document } from 'mongoose';

export interface INavigation extends Document {
  menu_home: string;
  menu_about: string;
  menu_services: string;
  menu_projects: string;
  menu_gallery: string;
  menu_careers: string;
  menu_contact: string;
  createdAt: Date;
  updatedAt: Date;
}

const NavigationSchema: Schema = new Schema(
  {
    menu_home: { type: String, default: 'Home' },
    menu_about: { type: String, default: 'About' },
    menu_services: { type: String, default: 'Services' },
    menu_projects: { type: String, default: 'Projects' },
    menu_gallery: { type: String, default: 'Gallery' },
    menu_careers: { type: String, default: 'Careers' },
    menu_contact: { type: String, default: 'Contact' },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Navigation || mongoose.model<INavigation>('Navigation', NavigationSchema);

