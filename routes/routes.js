// import express from "express";
// const routes = express.Router();
import registerController from '../controller/auth/registerController.js'
import loginController from '../controller/auth/loginController.js'

const routes = (app) => {
    app.post("/register", registerController.register);
    app.post("/login", loginController.login);
}

export default routes;



//route
// routes.get("/", )

// controller
// (req, res) => {
//     res.json({
//         msg: "test",
//         lisence: "MIT"
// })