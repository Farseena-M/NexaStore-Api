import mongoose, { Schema } from 'mongoose';
import { ISubCategory } from '../interfaces/subCategoryInterface';

const subCategorySchema = new Schema<ISubCategory>({
    name: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true }
});

export default mongoose.model<ISubCategory>('SubCategory', subCategorySchema);
