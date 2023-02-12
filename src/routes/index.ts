import { Router } from "express";
import { historyRouter } from "./history.route";
import { productRouter } from "./products.route";
import { userRouter } from "./user.route";

const route = Router();

route.get("/test", async (req, res) => {
    return res.json({ message:  'OK' })
});

route.use("/product", productRouter)
route.use("/user", userRouter)
route.use("/history", historyRouter)

export default route;
