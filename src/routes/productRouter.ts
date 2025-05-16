import express from 'express';
import { addProduct, addToWishlist, deleteProduct, filterProductsBySubCategory, getAllProducts, getProductById, getWishlistByUser, removeFromWishlist, searchProductsByName, updateProduct } from '../controllers/productController';
import { imageUpload } from '../middlewares/imageUpload';
import { verifyToken } from '../middlewares/protectRoute';

const productRouter = express.Router();

productRouter.post('/add-product', verifyToken, imageUpload, addProduct);
productRouter.get('/fetch-product', getAllProducts);
productRouter.get('/search', verifyToken, searchProductsByName);
productRouter.get('/filter-by-subcategory', verifyToken, filterProductsBySubCategory);
productRouter.get('/:id', verifyToken, getProductById);
productRouter.patch('/:id', imageUpload, verifyToken, updateProduct);
productRouter.delete('/:productId', verifyToken, deleteProduct);
productRouter.post('/wishlist/:userId', verifyToken, addToWishlist);
productRouter.get('/wishlist/:userId', verifyToken, getWishlistByUser);
productRouter.delete('/wishlist/:userId', verifyToken, removeFromWishlist);

export default productRouter;
