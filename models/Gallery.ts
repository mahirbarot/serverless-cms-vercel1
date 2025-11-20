import mongoose, { Schema, Document } from 'mongoose';

export interface IGallery extends Document {
  gallery_title: string;
  gallery_images: string[];
  createdAt: Date;
  updatedAt: Date;
}

const GallerySchema: Schema = new Schema(
  {
    gallery_title: { type: String, default: 'Gallery' },
    gallery_images: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Gallery || mongoose.model<IGallery>('Gallery', GallerySchema);

