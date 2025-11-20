import mongoose, { Schema, Document } from 'mongoose';

export interface IHero extends Document {
  hero_title: string;
  hero_subtitle: string;
  hero_background_image: string;
  hero_tagline?: string;
  createdAt: Date;
  updatedAt: Date;
}

const HeroSchema: Schema = new Schema(
  {
    hero_title: { type: String, default: 'Shaping the Future' },
    hero_subtitle: { type: String, default: 'Client Satisfaction Is Our Profit' },
    hero_background_image: { type: String, default: '' },
    hero_tagline: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Hero || mongoose.model<IHero>('Hero', HeroSchema);

