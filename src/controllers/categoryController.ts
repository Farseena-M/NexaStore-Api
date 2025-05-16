import { Request, Response } from 'express';
import categorySchema from '../models/categorySchema';
import subCategorySchema from '../models/subCategorySchema';
import mongoose from 'mongoose';



export const addCategory = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name } = req.body;
        const category = new categorySchema({ name });
        await category.save();
        res.status(201).json({ message: 'Category added successfully', category });
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};




export const getAllCategories = async (req: Request, res: Response): Promise<any> => {
    try {
        const categories = await categorySchema.find().populate({
            path: 'subCategories',
            select: 'name'
        });
        res.status(200).json({ message: `Fetched all categories successfully`, categories });
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};





export const addSubCategory = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, categoryId } = req.body;

        const category = await categorySchema.findById(categoryId);
        if (!category) return res.status(404).json({ message: 'Category not found' });

        const subCategory = new subCategorySchema({ name, category: categoryId });
        await subCategory.save();

        category.subCategories.push(subCategory._id as mongoose.Types.ObjectId);
        await category.save();

        res.status(201).json({ message: 'SubCategory created', subCategory });
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};






export const getAllSubCategories = async (req: Request, res: Response): Promise<any> => {
    try {
        const subCategories = await subCategorySchema.find().populate('category', 'name');
        res.status(200).json({ message: `Fetched all subcategories successfully`, subCategories });
    } catch (error: any) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
