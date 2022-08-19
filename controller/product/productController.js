import ProductModel from "../../model/ProductModel.js";
import UserSchema from "../../model/UserModel.js";
import multer, { diskStorage } from "multer";
import path from "path";
import fs from 'fs';
import customErrorHandler from "../../services/customErrorHandler.js";

// diskStorage
const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, "uploads/"),
	filename: (req, file, cb) => {
		// 1660889102382-97732441.jpg
		const uniqueName = `${Date.now()} - ${Math.round(
			Math.random() * 1e9
		)}${path.extname(file.originalname)}`;

        cb(null,uniqueName);
	},
});

const handleMultipartData = multer({
    storage,
    limits: { fileSize: 1000000*5}
}).single("image");


const productController = {
	async setProduct(req, res, next) {
        handleMultipartData(req, res, async(err) => {
            if(err){
                return next(customErrorHandler.imageUploadIssue());
            }

            const {name, price, type} = req.body;
            const filePath = req.file.path;

            try{
                const newData = new ProductModel({
                    name, price, type, image:filePath
                });
                const saveData = await newData.save();
                res.json(saveData);
            }catch(err) {
                fs.unlink(`${appRoot}/${filePath}`, (err) => {
                    console.log("Deleted");
                })
                next(err);
            }
        })
	},
};

export default productController;
