import UserSchema from "../../model/UserModel.js";
import bcrypt from 'bcrypt';

const registerController = {
    async register(req,res,next) {
        const { name, email, password } = req.body;

        // hash user password
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt)

        const newUser = new UserSchema({
            name: name,
            email:email,
            password: hashPassword
        });

        try{
            await newUser.save();
            res.json({ msg: "user rester successfull"})
        }catch(err){
            next(err)
        }
    }
}

export default registerController;
