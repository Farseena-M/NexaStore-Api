import mongoose from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  wishlist: mongoose.Types.ObjectId[];
}