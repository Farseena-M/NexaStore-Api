import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import userSchema from '../models/userSchema';
import { generateToken } from '../utils/generateToken';



export const signup = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await userSchema.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already registered' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userSchema({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};




export const Login = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body;

        const user = await userSchema.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = generateToken(user._id.toString())

        res.json({ _id: user._id, token });
    } catch (error: any) {
        return res.status(500).json({
            status: "failure",
            message: "Something went wrong...!",
            error: error.message
        });
    }
};
