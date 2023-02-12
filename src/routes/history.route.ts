import { Router } from "express";
import { createHistory, getAllHistory } from "../controller/historyController";


export const historyRouter = Router()

historyRouter.get("/all", getAllHistory);
historyRouter.post("/create", createHistory);