import { Document, Types } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  subCategories: Types.ObjectId[];  
}
