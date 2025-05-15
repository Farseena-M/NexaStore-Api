import { Request, Response } from 'express';
import productSchema from '../models/productSchema';
import userSchema from '../models/userSchema';
import subCategorySchema from '../models/subCategorySchema';

export const addProduct = async (req: Request, res: Response): Promise<any> => {
    try {
        const { title, description, subCategory } = req.body;

        let variants = req.body.variants;
        if (typeof variants === 'string') {
            try {
                variants = JSON.parse(variants);
            } catch {
                return res.status(400).json({ message: 'Invalid variants JSON format' });
            }
        }

        const images = req.body.images || [];

        if (!title || !subCategory || !variants || !Array.isArray(variants) || variants.length === 0) {
            return res.status(400).json({ message: 'Title, subCategory and variants are required.' });
        }

        const product = new productSchema({
            title,
            description,
            subCategory,
            variants,
            images,
        });

        const savedProduct = await product.save();
        return res.status(201).json({ message: `Product added successfully`, savedProduct });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};





export const getAllProducts = async (req: Request, res: Response): Promise<any> => {
    try {
        const products = await productSchema.find();
        return res.status(200).json({ message: `Product fetched successfully`, products });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};



export const getProductById = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        const product = await productSchema.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({ product });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};









export const updateProduct = async (req: Request, res: Response): Promise<any> => {
    try {
        const productId = req.params.id;
        const { title, description, subCategory } = req.body;

        const existingProduct = await productSchema.findById(productId);
        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let updateData: any = {};

        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (subCategory) updateData.subCategory = subCategory;

        let variants = req.body.variants;
        if (variants) {
            if (typeof variants === 'string') {
                try {
                    variants = JSON.parse(variants);
                } catch {
                    return res.status(400).json({ message: 'Invalid variants JSON format' });
                }
            }

            if (!Array.isArray(variants) || variants.length === 0) {
                return res.status(400).json({ message: 'Variants must be a non-empty array.' });
            }

            updateData.variants = variants;
        }

        let newImages: string[] | null = null;
        console.log("req.files:", req.files);
        console.log("req.body.images:", req.body.images);

        if (req.files && Array.isArray(req.files) && req.files.length > 0) {
            newImages = req.files.map((file: any) => file.path);
        }

        else if (req.body.images) {
            try {
                const parsedImages = typeof req.body.images === 'string'
                    ? JSON.parse(req.body.images)
                    : req.body.images;

                if (Array.isArray(parsedImages) && parsedImages.length > 0) {
                    newImages = parsedImages;
                }
            } catch {
                return res.status(400).json({ message: 'Invalid images JSON format' });
            }
        }

        if (newImages !== null) {
            updateData.images = newImages;
        }

        const updatedProduct = await productSchema.findByIdAndUpdate(
            productId,
            updateData,
            { new: true }
        );

        res.status(200).json({ message: 'Product updated successfully', updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};





export const deleteProduct = async (req: Request, res: Response): Promise<any> => {
    const { productId } = req.params;

    try {
        const product = await productSchema.findByIdAndDelete(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully', deletedProduct: product });
    } catch (error) {
        console.error('Delete Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};






export const addToWishlist = async (req: Request, res: Response): Promise<any> => {
    const { productId } = req.body;
    const { userId } = req.params;

    try {
        const user = await userSchema.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        if (!user.wishlist.includes(productId)) {
            user.wishlist.push(productId);
            await user.save();
        }

        res.status(200).json({ message: 'Product added to wishlist' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};




export const getWishlistByUser = async (req: Request, res: Response): Promise<any> => {
    const { userId } = req.params;

    try {
        const user = await userSchema.findById(userId).populate('wishlist');
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.status(200).json({ wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};




export const searchProductsByName = async (req: Request, res: Response): Promise<any> => {
    const { query } = req.query;

    if (!query || typeof query !== 'string') {
        return res.status(400).json({ message: 'Search query is required' });
    }

    try {
        const products = await productSchema.find({
            title: { $regex: query, $options: 'i' }
        });

        res.status(200).json({ results: products });
    } catch (error) {
        console.error('Search Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};




export const filterProductsBySubCategory = async (req: Request, res: Response): Promise<any> => {
    const { subCategoryName } = req.query;

    if (!subCategoryName || typeof subCategoryName !== 'string') {
        return res.status(400).json({ message: 'subCategoryName query parameter is required' });
    }

    try {
        const subCategory = await subCategorySchema.findOne({ name: subCategoryName });

        if (!subCategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }

        const products = await productSchema.find({ subCategory: subCategory._id });

        res.status(200).json(products);
    } catch (error) {
        console.error('Error filtering products by subcategory:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};



