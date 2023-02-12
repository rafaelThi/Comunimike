import { allHistory, createHistoryByIds } from "../service/history.service";

export async function getAllHistory (req, res) {
    try {
        const AllHistory = await allHistory(req.body)
        return res.json({History: AllHistory})
    } catch (err) {
        return res.json({ message:  `Erro ao carregar todo o historico de compra. ${err}` })
    }
}

export async function createHistory(req, res) {
try{
    const createHisto = await createHistoryByIds(req.body)
    return res.json({CreateHistory: createHisto})
} catch (err) {
    return res.json({ message:  `Erro ao gerar um historico de compra. ${err}` })
}
}