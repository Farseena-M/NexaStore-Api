import { Document, Types } from 'mongoose';

export interface IVariant {
  ram: string;
  price: number;
  qty: number;
}

export interface IProduct extends Document {
  name: string;
  description: string;
  subCategory: Types.ObjectId;
  variants: IVariant[];
}
