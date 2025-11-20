import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  service_name: string;
  service_description: string;
  service_icon?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema: Schema = new Schema(
  {
    service_name: { type: String, required: true },
    service_description: { type: String, default: '' },
    service_icon: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);

