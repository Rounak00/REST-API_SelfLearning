import ProductModel from "../../model/ProductModel.js";
import UserSchema from "../../model/UserModel.js";
import multer from "multer";
import path from "path";
import customErrorHandler from "../../services/customErrorHandler.js";
import fs from 'fs';

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, "uploads/"),
	filename: (req, file, cb) => {
		const uniqueName = `${Date.now()}-${Math.round(
			Math.random() * 1e9
		)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
	},
});

const handleMultipart = multer({
    storage,
    limits: { fileSize: 1000000 * 5 }
}).single("image");


const productController = {
    async setProduct(req, res, next) {

        handleMultipart(req,res, async(err) => {
            if(err){
                return next(customErrorHandler.imageUploadIssue(err.message))
            }
            const filePath = req.file.path;


            // product controller
            const {productName, price, desc,type,image} = req.body;
            const newProduct = new ProductModel({
                productName, price, desc, type, image: filePath
            });
            try {
                const saveProduct = await newProduct.save();
                res.status(201).json(saveProduct);
            } catch (err) {
                // delete the file
                fs.unlink(`${appRoot}/${filePath}`, (err) => {
                    if(err){
                        console.log("Failed");
                    }
                })
                next(err);
            }
        })

    },


	async getProduct(req, res, next) {
		try {
			const result = await UserSchema.find();
			res.json(result);
		} catch (err) {
			next(err);
		}
	},
	async testQuery(req, res, next) {
		const { min, max } = req.query;
		console.log(min, "  ", max);
		try {
			const saveProduct = await ProductModel.find().sort({ price: -1 });
			res.status(201).json(saveProduct);
		} catch (err) {
			next(err);
		}
	},
};

export default productController;
