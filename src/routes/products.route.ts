import { Router } from "express";
import { verify } from "jsonwebtoken";
import { buyPrd, getAll, getCreate, getFindById, getFindByName } from "../controller/productController";


export const productRouter = Router();

productRouter.use((req, res, next) => {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: "Unauthorized" });
  
    try {
        verify(token, "secretkey");
      next();
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  });

productRouter.post("/create", getCreate);
productRouter.get("/all", getAll);
productRouter.get("/find/id/:id", getFindById);
productRouter.get("/find/name/:name", getFindByName);
productRouter.put("/buy/:id", buyPrd);
    