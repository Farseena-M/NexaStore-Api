import { Router } from 'express';
import { addCategory, addSubCategory } from '../controllers/categoryController';
import { verifyToken } from '../middlewares/protectRoute';

const catogoryRouter = Router();

catogoryRouter.post('/add-catogory',verifyToken, addCategory);
catogoryRouter.post('/add-subcatogory',verifyToken, addSubCategory);

export default catogoryRouter;
