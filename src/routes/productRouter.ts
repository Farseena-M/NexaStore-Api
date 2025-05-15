import express from 'express';
import { addProduct, addToWishlist, getAllProducts, getProductById, getWishlistByUser, updateProduct } from '../controllers/productController';
import { imageUpload } from '../middlewares/imageUpload';

const productRouter = express.Router();

productRouter.post('/add-product', imageUpload, addProduct);
productRouter.get('/fetch-product', getAllProducts);
productRouter.get('/:id', getProductById);
productRouter.patch('/:id', imageUpload, updateProduct);
productRouter.post('/wishlist/:userId', addToWishlist);
productRouter.get('/wishlist/:userId', getWishlistByUser);

export default productRouter;
