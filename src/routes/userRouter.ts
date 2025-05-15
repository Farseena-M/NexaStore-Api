import { Router } from 'express';
import { Login, signup } from '../controllers/userController';

const userRouter = Router();

userRouter.post('/signup', signup);
userRouter.post('/login', Login);

export default userRouter;
