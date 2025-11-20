import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  project_title: string;
  project_cover_image: string;
  project_thumbnail_image?: string;
  project_description: string;
  project_year: number;
  project_category: string;
  project_link: string;
  project_type: string;
  project_tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    project_title: { type: String, required: true },
    project_cover_image: { type: String, required: true },
    project_thumbnail_image: { type: String, default: '' },
    project_description: { type: String, default: '' },
    project_year: { type: Number, required: true },
    project_category: { type: String, required: true },
    project_link: { type: String, default: 'View Project' },
    project_type: { type: String, required: true },
    project_tags: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

