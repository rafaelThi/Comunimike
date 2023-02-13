import { Router } from "express";
import { verify } from "jsonwebtoken";
import { createHistory, getAllHistory } from "../controller/historyController";


export const historyRouter = Router()

historyRouter.use((req, res, next) => {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: "Unauthorized" });
  
    try {
        verify(token, "secretkey");
      next();
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  });

historyRouter.get("/all", getAllHistory);
historyRouter.post("/create", createHistory);