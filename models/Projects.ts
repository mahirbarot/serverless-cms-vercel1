import mongoose, { Schema, Document } from 'mongoose';

export interface IProjects extends Document {
  projects_title: string;
  projects_subtitle: string;
  view_all_projects_link: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectsSchema: Schema = new Schema(
  {
    projects_title: { type: String, default: 'Our Projects' },
    projects_subtitle: { type: String, default: 'Innovative architectural solutions for modern living' },
    view_all_projects_link: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Projects || mongoose.model<IProjects>('Projects', ProjectsSchema);

