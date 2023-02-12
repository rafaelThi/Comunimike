import { Router } from "express";
import { postCreateAdmin, postCreateCliente, putDeleteUser, putEditUser, putRecoverUser } from "../controller/userController";


export const userRouter = Router();

userRouter.post("/create/client", postCreateCliente);
userRouter.post("/create/admim", postCreateAdmin);
userRouter.put("/edit", putEditUser);
userRouter.put("/recover", putRecoverUser);
userRouter.put("/delete", putDeleteUser);

    