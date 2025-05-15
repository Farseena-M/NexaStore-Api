import mongoose from 'mongoose';
import { IProduct, IVariant } from '../interfaces/productInterface';

const variantSchema = new mongoose.Schema<IVariant>({
    ram: String,
    price: Number,
    qty: Number
});

const productSchema = new mongoose.Schema<IProduct>({
    title: String,
    description: String,
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
    variants: [variantSchema],
    images: [{ type: String }]
});

export default mongoose.model<IProduct>('Product', productSchema);
