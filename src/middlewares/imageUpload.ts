import multer from 'multer';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'uploads'),
    filename: (req, file, cb) => cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`),
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }).array('images', 10);

export const imageUpload = (req: Request, res: Response, next: NextFunction) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ status: 'error', message: err.message });
        }

        const files = req.files as Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] } | undefined;

        if (!files) {
            req.body = req.body || {};
            req.body.images = [];
            return next();
        }

        let filesArray: Express.Multer.File[] = [];

        if (Array.isArray(files)) {
            filesArray = files;
        } else {
            filesArray = Object.values(files)[0] || [];
        }

        try {
            const uploadResults = await Promise.all(
                filesArray.map(file => cloudinary.uploader.upload(file.path, { folder: 'Images' }))
            );

            const urls = uploadResults.map(result => result.secure_url);

            req.body = req.body || {};
            req.body.images = urls;

            next();
        } catch (uploadError: any) {
            res.status(500).json({ status: 'error', message: uploadError.message });
        }
    });
};
