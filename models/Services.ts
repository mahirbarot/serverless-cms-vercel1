import mongoose, { Schema, Document } from 'mongoose';

export interface IServices extends Document {
  services_title: string;
  createdAt: Date;
  updatedAt: Date;
}

const ServicesSchema: Schema = new Schema(
  {
    services_title: { type: String, default: 'Our Services' },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Services || mongoose.model<IServices>('Services', ServicesSchema);

