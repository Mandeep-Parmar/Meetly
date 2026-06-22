import express from "express";
import validate from "../middlewares/validate.js";
import { loginSchema, registerSchema } from "../validators/userValidator.js";
import { loginUser, registerUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", validate(registerSchema), registerUser);
userRouter.post("/login", validate(loginSchema), loginUser);

export default userRouter;
