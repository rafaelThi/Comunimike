import { createAdmin, createCliente, deleteUser, editUser, recoverUser } from "../service/user.service";


export async function postCreateCliente (req, res) {
    try {
        const createClie = await createCliente(req.body)
        return res.json({Client: createClie})
    } catch (err) {
        throw new Error(`Erro ao criar novo cliente . Erro:${err}`);
    }
}

export async function postCreateAdmin(req, res) {
    try {
        const createAdm = await createAdmin(req.body)
        return res.json({Client: createAdm})
    } catch (err) {
        throw new Error(`Erro ao criar novo Admim . Erro:${err}`);
    }
}

export async function putEditUser(req, res) {
    try {
        const putEditUser = await editUser(req.body)
        return res.json({User: putEditUser})
    } catch (err) {
        throw new Error(`Erro ao editar o usuário . Erro:${err}`);
    }
}

export async function putRecoverUser(req, res) {
    try {
        const putRecoverUser = await recoverUser(req.body)
        return res.json({User: putRecoverUser, message: 'Senha editada com sucesso'})
    } catch (err) {
        throw new Error(`Erro ao recuperar senha do usuário . Erro:${err}`);
    }
}

export async function putDeleteUser(req, res) {
    try {
        const putDeleteUser = await deleteUser(req.body.email)
        return res.json({User: putDeleteUser})
    } catch (err) {
        throw new Error(`Erro ao inativar usuário . Erro:${err}`);
    }
}
