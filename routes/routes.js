import express from "express";
const routes = express.Router();

import registerController from "../controller/auth/registerController.js";
import loginController from "../controller/auth/loginController.js";
import productController from "../controller/product/productController.js";

import {verifyAdmin } from '../middleware/verifyToken.js'



// auth controller
routes.post("/register", registerController.register);
routes.post("/login", loginController.login);

// product controller
routes.get("/product",verifyAdmin, productController.getProduct);

export default routes;
