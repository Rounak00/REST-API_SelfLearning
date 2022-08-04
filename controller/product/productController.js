import UserSchema from "../../model/UserModel.js";

const productController = {
    async getProduct(req,res,next) {
        try{
            const result =  await UserSchema.find()
            res.json(result)
        }catch(err) {
            next(err)
        }

    }
}

export default productController;