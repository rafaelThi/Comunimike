import { createSession } from "../service/createSession"

export async function login (req, res) {
    try {
        const loginSession = await createSession(req.body)
        return res.json({token: loginSession})
    } catch (err) {
        return res.json({ message:  `Erro ao Logar. ${err}` })
    }
}

export async function logout(req, res) {
    try {
        res.clearCookie("token");
        return res.json({ message: "Sucesso ao realizar o logout" });
    } catch (err) {
        throw new Error(`Erro ao deslogar. ${err}`);
        
    }
}