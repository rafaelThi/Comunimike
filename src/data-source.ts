import "reflect-metadata"
import { DataSource } from "typeorm"
import { HistoryPurchase } from "./entity/HistoryPurchase";
import { Products } from "./entity/Product"
import { Users } from './entity/Users';

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [Users, Products, HistoryPurchase],
    migrations: [],
    subscribers: [],
})
