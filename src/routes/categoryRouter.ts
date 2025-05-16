import { Router } from 'express';
import { addCategory, addSubCategory, getAllCategories, getAllSubCategories } from '../controllers/categoryController';
import { verifyToken } from '../middlewares/protectRoute';

const catogoryRouter = Router();

catogoryRouter.post('/add-catogory', verifyToken, addCategory);
catogoryRouter.get('/categories', verifyToken, getAllCategories);
catogoryRouter.post('/add-subcatogory', verifyToken, addSubCategory);
catogoryRouter.get('/subcatogories', verifyToken, getAllSubCategories);

export default catogoryRouter;
