import forgotPassword from "@controllers/auth/forgotPassword";
import login from "@controllers/auth/login";
import logout from "@controllers/auth/logout";
import register from "@controllers/auth/register";
import resetPassword from "@controllers/auth/resetPassword";
import restoreSession from "@controllers/auth/restoreSession";
import verify from "@controllers/auth/verify";
import loggedInUser from "@middlewares/loggedInUser";
import { Router } from "express";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.patch("/verify", verify);
router.patch("/forgotpassword", forgotPassword);
router.patch("/resetpassword", resetPassword);
router.get("/logout", loggedInUser, logout);
router.get("/restoresession", restoreSession);

export default router;
