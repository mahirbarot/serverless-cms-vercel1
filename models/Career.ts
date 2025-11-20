import mongoose, { Schema, Document } from 'mongoose';

export interface ICareer extends Document {
  careers_title: string;
  careers_description: string;
  current_openings_title: string;
  openings_list: {
    job_title: string;
    apply_now_button_text: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const OpeningSchema: Schema = new Schema({
  job_title: { type: String, required: true },
  apply_now_button_text: { type: String, default: 'Apply Now' },
});

const CareerSchema: Schema = new Schema(
  {
    careers_title: { type: String, default: 'Join Our Team' },
    careers_description: { type: String, default: '' },
    current_openings_title: { type: String, default: 'Current Openings' },
    openings_list: { type: [OpeningSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Career || mongoose.model<ICareer>('Career', CareerSchema);

