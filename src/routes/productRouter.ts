import express from 'express';
import { addProduct, addToWishlist, deleteProduct, filterProductsBySubCategory, getAllProducts, getProductById, getWishlistByUser, searchProductsByName, updateProduct } from '../controllers/productController';
import { imageUpload } from '../middlewares/imageUpload';

const productRouter = express.Router();

productRouter.post('/add-product', imageUpload, addProduct);
productRouter.get('/fetch-product', getAllProducts);
productRouter.get('/search', searchProductsByName);
productRouter.get('/filter-by-subcategory', filterProductsBySubCategory);
productRouter.get('/:id', getProductById);
productRouter.patch('/:id', imageUpload, updateProduct);
productRouter.delete('/:productId', deleteProduct);
productRouter.post('/wishlist/:userId', addToWishlist);
productRouter.get('/wishlist/:userId', getWishlistByUser);

export default productRouter;
