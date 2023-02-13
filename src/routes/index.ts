import { Router } from "express";
import { authRouter } from "./auth.route";
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
route.use("/auth", authRouter)

export default route;
