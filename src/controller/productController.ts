import {buyProd, createProduct, findAllProd, findByIdProd, findByNameProd} from "../service/product.service";

export async function getCreate (req, res) {
    try {
        const createProd = await createProduct(req.body);
           return res.json({NewProdcut: createProd}).status(201)
    } catch (err) {
        throw new Error(`Erro ao criar novo produto. Erro:${err}`);
    }
}

export async function getAll(req, res) {
        try {
            const findProd = await findAllProd()
            return res.json({ Products: findProd });
        } catch (err) {
            throw new Error(`Erro ao buscar todos os Produtos. Erro:${err}`);
            
        }
    }


export async function getFindById(req, res) {
        try {
          const findId = await findByIdProd(req.params.id)
          return res.json({Product: findId})
        } catch (err) {
            throw new Error(`Erro ao buscar um produto. Erro:${err}`);
        }
    }

export async function getFindByName(req, res) {
        try {
        const findName = await findByNameProd(req.params.name)
        return res.json({Product: findName})
        } catch (err) {
            throw new Error(`Erro ao buscar um produto. Erro:${err}`);
        }
    }

export async function buyPrd (req, res) {
        try {
        const buy = await buyProd(req.params.id)
        return res.json({Product: buy})
        } catch (err) {
            throw new Error(`Erro ao comprar um produto. Erro:${err}`);
        }
    }