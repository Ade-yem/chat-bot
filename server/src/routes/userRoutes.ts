import { Router } from "express";
import userController from "../controllers/userController.js";
import { validate, validateLogin, validateRegister } from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";

const userRoutes = Router()
userRoutes.get('/', userController.getAllUsers);
userRoutes.post('/register', validate(validateRegister), userController.createUser);
userRoutes.post('/login', validate(validateLogin), userController.loginUser);
userRoutes.post('/logout', validate(validateLogin), userController.logoutUser);
userRoutes.get('/status', verifyToken, userController.verifyUser);


export default userRoutes;