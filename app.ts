import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import userRouter from './src/routes/userRouter';
import catogoryRouter from './src/routes/categoryRouter';



const app = express()

app.use(express.json())
app.use(cors());


app.use('/user', userRouter)
app.use('/product', catogoryRouter)


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({ message: err.message || 'An unexpected error occurred' });
});


export default app