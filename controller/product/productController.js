import ProductModel from "../../model/ProductModel.js";
import UserSchema from "../../model/UserModel.js";

const productController = {
    async getProduct(req,res,next) {
        try{
            const result =  await UserSchema.find()
            res.json(result)
        }catch(err) {
            next(err)
        }
    },
    async setProduct(req, res, next) {
        const newProduct = new ProductModel(req.body);
        try{
            const saveProduct = await newProduct.save();
            res.status(201).json(saveProduct);
        }catch(err){
            next(err);
        }
    },
    async testQuery(req, res, next) {
        const { min,max } = req.query;
        console.log(min, "  ", max);
        try{
            const saveProduct = await ProductModel.find({ price: { $gt: min, $lt: max} });
            res.status(201).json(saveProduct);
        }catch(err){
            next(err);
        }
    }
}

export default productController;