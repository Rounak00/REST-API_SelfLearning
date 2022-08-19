import express from "express";
const routes = express.Router();
import { loginController, registerController,productController, healthCheckController } from "../controller";
import {verifyAdmin } from '../middleware/verifyToken'


// healthcheck
routes.get("/healthcheck", healthCheckController.healthCheck);

// auth controller
routes.post("/register", registerController.register);
routes.post("/login", loginController.login);

// product controller
routes.post("/product", productController.setProduct);

export default routes;
