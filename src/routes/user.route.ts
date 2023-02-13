import { Router } from "express";
import { verify } from "jsonwebtoken";
import { postCreateAdmin, postCreateCliente, putDeleteUser, putEditUser, putRecoverUser } from "../controller/userController";


export const userRouter = Router();

userRouter.use((req, res, next) => {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: "Unauthorized" });
  
    try {
        verify(token, "secretkey");
      next();
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  });

userRouter.post("/create/client", postCreateCliente);
userRouter.post("/create/admim", postCreateAdmin);
userRouter.put("/edit", putEditUser);
userRouter.put("/recover", putRecoverUser);
userRouter.put("/delete", putDeleteUser);

    