import express from "express";
const routes = express.Router();
import UserSchema from '../model/UserModel.js'

routes.get("/", (req, res) => {
    res.json({
        msg: "test",
        lisence: "MIT"
    })
})

routes.post("/register", async(req,res) => {
    const newUser = new UserSchema(req.body);
    try{
        await newUser.save();
        res.json({ msg: "user rester successfull"})
    }catch(err){
        console.log(err);
    }
})



export default routes;