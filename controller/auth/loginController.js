import UserSchema from "../../model/UserModel.js";
import bcrypt from "bcrypt";

const loginController = {
	async login(req, res) {
		const { email, password } = req.body;

		try {
			// check user is exist or not
			const isExist = await UserSchema.findOne({ email: req.body.email });
			if (!isExist) {
				return res.status(401).json({ msg: "create your account first" });
			}

			// compare your password
			const newUser = bcrypt.compareSync(req.body.password, isExist.password);
			if (!newUser) {
				return res.status(401).json({ msg: "your password is wrong" });
			}

            const {password,isAdmin,__v, ...other} = isExist._doc

            res.status(201).json(other);
		} catch (err) {
			console.log(err);
		}
	},
};

export default loginController;
