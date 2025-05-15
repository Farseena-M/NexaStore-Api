import mongoose from 'mongoose';
import { IUser } from '../interfaces/userInterface';

const userSchema = new mongoose.Schema<IUser>({
    name: String,
    email: { type: String, unique: true },
    password: String,
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

export default mongoose.model<IUser>('User', userSchema);
