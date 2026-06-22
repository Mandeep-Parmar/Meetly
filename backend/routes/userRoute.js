import express from "express";
import validate from "../middlewares/validate.js";
import { registerSchema } from "../validators/userValidator.js";
import { registerUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", validate(registerSchema), registerUser);

export default userRouter;
