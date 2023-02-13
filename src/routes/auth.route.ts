import { Router } from "express";
import { login, logout } from "../controller/authController";


export const authRouter = Router()

authRouter.post("/login", login);
authRouter.post("/logout", logout)