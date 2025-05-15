import { Router } from 'express';
import { addCategory, addSubCategory } from '../controllers/categoryController';

const catogoryRouter = Router();

catogoryRouter.post('/add-catogory', addCategory);
catogoryRouter.post('/add-subcatogory', addSubCategory);

export default catogoryRouter;
