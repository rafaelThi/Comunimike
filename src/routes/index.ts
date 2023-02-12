import { Router } from "express";
import { AppDataSource } from "../data-source";
import { IProd } from "../dto/IProd";
import { Products } from "../entity/Product";
import { Users } from "../entity/Users";
import { PasswordCrypto } from "../service/PasswordCrypto";

const route = Router();

route.get("/test", async (req, res) => {
    return res.json({ message:  'OK' })
});

route.get("/product/all", async (req, res) => {
    try {
        
        const productsStock = []
        const product: Array<IProd> = await AppDataSource.getRepository(Products).find();
        product.map((prod:IProd) => {
            if (prod.amount <= 0 || typeof(prod.amount) != 'number') {
                prod.noStock = true
                productsStock.push(prod)
            }else{
                prod.noStock = false
                productsStock.push(prod)
            }
        })
        return res.json({ Product: productsStock });
    } catch (err) {
        throw new Error(`Erro ao buscar todos os Produtos. Erro:${err}`);
        
    }
});

route.get("/find/product/id/:id", async (req, res) => {
    try {
        const product:IProd = await AppDataSource.getRepository(Products).findOne({
            where: {
                id: req.params.id,
            },
        });
        if (!product) {
            return res.json({ message: "Produto não encontrado. :/" });
        }
        if (product.amount <= 0) {
            product.noStock = true
            return res.json({ Product: product});
        }
        product.noStock = false
        return res.json({ Product: product });
    } catch (err) {
        throw new Error(`Erro ao buscar um produto. Erro:${err}`);
    }
});

route.get("/find/product/name/:name", async (req, res) => {
    try {
        const product:Array<IProd> = await AppDataSource.getRepository(Products).query(`
    SELECT * FROM Products
    WHERE name LIKE '%${req.params.name.toUpperCase()}%'
    `);
        if (product.length === 0) {
            return res.json({ message: `Nenhum produto encontrado para sua busca: '${req.params.name}' :/` });
        }
        const productsWithStock = []
        product.map((prod:IProd) => {
            if (prod.amount > 0) {
                productsWithStock.push(prod)
            }
        })
        return res.json({ Product: productsWithStock });
    } catch (err) {
        throw new Error(`Erro ao buscar um produto. Erro:${err}`);
    }
});

route.put("/buy/product/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const findProduct = await AppDataSource.getRepository(Products).findOne({
            where: {
                id: id,
            },
        });
        findProduct.amount = findProduct.amount - 1;
        await AppDataSource.manager.save(findProduct);
        return res.json(findProduct);
    } catch (err) {
        throw new Error(`Erro ao comprar um produto. Erro:${err}`);
    }
    });
    
    route.post("/create/product", async (req, res) => {
        try {
            const { name, color, abount, mark, amount } = req.body;
            if (typeof amount != "number") {
                return res.json({ message: "Quantidade precisa ser um numero" });
            }
            const product = await AppDataSource.getRepository(Products).findOne({
                where: {
                    name: name.toUpperCase(),
                },
            });
            
            if (product) {
                return res.json({ message: "Produto já cadastrado" });
            }
            const newProd:IProd = new Products();
            newProd.name = name;
            newProd.color = color;
            newProd.abount = abount;
            newProd.mark = mark;
            newProd.amount = amount as number;
            
            await AppDataSource.manager.save(newProd);
            return res.json({ NewProd: newProd });
        } catch (err) {
            throw new Error(`Erro ao criar novo produto. Erro:${err}`);
        }
        });
        
route.post("/create/user/client", async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const passHash = await PasswordCrypto.hashPassword(password);
        
        const user = await AppDataSource.getRepository(Users).findOne({
            where: {
                email: email,
            },
        });
        
        if (user) {
            return res.json({ message: "E-mail já cadastrado" });
        }
        const newUser = new Users();
        newUser.email = email;
        newUser.password = passHash;
        newUser.admin = false;
        
        await AppDataSource.manager.save(newUser);
        return res.json({ newUser: newUser });
    } catch (err) {
        throw new Error(`Erro ao criar novo cliente . Erro:${err}`);
    }
    });

route.post("/create/user/admim", async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const passHash = await PasswordCrypto.hashPassword(password);
        
        const user = await AppDataSource.getRepository(Users).findOne({
            where: {
                email: email,
            },
        });
        
        if (user) {
            return res.json({message: 'E-mail já cadastrado'})
        }
        const newUser = new Users();
        newUser.email = email;
        newUser.password = passHash;
        newUser.admin = true;
        
        await AppDataSource.manager.save(newUser);
        return res.json({ newUser: newUser });
    } catch (err) {
        throw new Error(`Erro ao criar novo Adm. Erro:${err}`);
        
    }
    });
    
    export default route;
