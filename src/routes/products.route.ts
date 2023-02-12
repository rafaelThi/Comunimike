import { Router } from "express";
import { buyPrd, getAll, getCreate, getFindById, getFindByName } from "../controller/productController";


export const productRouter = Router();

productRouter.post("/create", getCreate);
productRouter.get("/all", getAll);
productRouter.get("/find/id/:id", getFindById);
productRouter.get("/find/name/:name", getFindByName);
productRouter.put("/buy/:id", buyPrd);
    