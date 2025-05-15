import mongoose, { Schema } from 'mongoose';
import { ICategory } from '../interfaces/categoryInterface';

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  subCategories: [{ type: Schema.Types.ObjectId, ref: 'SubCategory' }]
});

export default mongoose.model<ICategory>('Category', categorySchema);
