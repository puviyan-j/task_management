import express from "express";
import { signup, login, getuser } from "../controller/user/userController.js";
import { signupvalidation } from "../middleware/validation/validation.js";
import auth from "../middleware/auth/auth.js";

const router = express.Router();

router.post("/signup", signupvalidation, signup);
router.post("/login", login);
router.get("/getuser", auth, getuser);

export default router;
