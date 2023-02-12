import { isUuid } from "uuidv4";
import { AppDataSource } from "../data-source";
import { IIDs } from "../dto/dtoHistory";
import { HistoryPurchase } from "../entity/HistoryPurchase";

export async function allHistory (req) {
        const history = await AppDataSource.getRepository(HistoryPurchase).find();
        return history

}

export async function createHistoryByIds (ids: IIDs) {
        if (!isUuid(ids.idUser) && !isUuid(ids.idProduct)) {
            return `Os dois Ids precisam ser UUIDV4, mas foram enviados: User:${ids.idUser} e Product:${ids.idProduct}` 
        }

        const newHistory = new HistoryPurchase();
        newHistory.idUser = ids.idUser;
        newHistory.idProduct = ids.idProduct;
        newHistory.create = new Date();
        
        await AppDataSource.manager.save(newHistory);
        return  newHistory

}