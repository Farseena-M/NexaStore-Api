import { Document, Types } from 'mongoose';

export interface IVariant {
  ram: string;
  price: number;
  qty: number;
}

export interface IProduct extends Document {
  title: string;
  description: string;
  subCategory: Types.ObjectId;
  variants: IVariant[];
  images: string[];
}
