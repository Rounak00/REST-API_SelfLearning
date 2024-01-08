import UserSchema from "../../model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/index.js';
import customErrorHandler from "../../services/customErrorHandler.js";

const loginController = {
	async login(req, res,next) {
		// const { email, password } = req.body;
		try {
			// check user is exist or not
			const isExist = await UserSchema.findOne({ email: req.body.email });
			if (!isExist) {
				return next(customErrorHandler.unAuthorizedUser("User is not exist"))
			}

			// compare your password
			const newUser = bcrypt.compareSync(req.body.password, isExist.password);
			if (!newUser) {
				return next(customErrorHandler.wringCredentials())
			}

			// generate token
			const generateToken = jwt.sign({
				id: isExist._id,
				isAdmin: isExist.isAdmin
			}, JWT_SECRET)

            const {password,isAdmin,__v, ...other} = isExist._doc

            res.cookie("access_token",generateToken, { httpOnly: true}).status(201).json(other);
			
		} catch (err) {
			next(err)
		}
	},
};

export default loginController;
