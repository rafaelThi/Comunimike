import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { Products } from '../entity/Product';
import { Users } from '../entity/Users';
import { PasswordCrypto } from '../service/PasswordCrypto';

const route = Router();


route.get('/test', async (req, res) => {
    return res.json({ message:  'SHOW' })
})

route.get('/find/product/id/:id', async (req, res) => {

    const product = await AppDataSource.getRepository(Products).findOne({
        where: {
            id: req.params.id
        }
    }) 
    if (product.amount <= 0) {
        return res.json({Product: product, message: 'Produto sem estoque'})
    }
return res.json({Product: product })
})

route.get('/find/product/name/:name', async (req, res) => {

    const product = await AppDataSource.getRepository(Products).query(`
    SELECT * FROM Products
    WHERE name LIKE '%${req.params.name.toUpperCase()}%'
    `)
if (product.amount <= 0) {
    return res.json({Product: product, message: 'Produto sem estoque'})
}
return res.json({Product: product, })
})

route.put('/buy/product/:id', async (req, res) => {
    const { id } = req.params;
    const findProduct = await AppDataSource.getRepository(Products).findOne({
        where: {
            id: id,
        }
    })
    findProduct.amount = findProduct.amount -1;
    await AppDataSource.manager.save(findProduct)
    return res.json(findProduct)
})

route.post('/create/product', async (req, res) => {
    const { name, color, abount, mark, amount } = req.body;
    const Product = await AppDataSource.getRepository(Products).findOne({
        where: {
            name: name.toUpperCase()
        }
    }) 

    if (Product) {
        return res.json({message: 'Produto já cadastrado'})
    }
    const newProd = new Products()
    newProd.name = name
    newProd.color = color
    newProd.abount = abount
    newProd.mark = mark
    newProd.amount = amount

     await AppDataSource.manager.save(newProd)
     return res.json({NewProd: newProd})
})

route.post('/create/user/client', async (req, res) => {
    const { email, password } = req.body;

    const passHash = await PasswordCrypto.hashPassword(password)

    const user = await AppDataSource.getRepository(Users).findOne({
        where: {
            email: email
        }
    }) 

    if (user) {
        return res.json({message: 'E-mail já cadastrado'})
    }
    const newUser = new Users()
    newUser.email = email
    newUser.password = passHash
    newUser.admin = false

     await AppDataSource.manager.save(newUser)
     return res.json({newUser: newUser})

})

route.post('/create/user/admim', async (req, res) => {
    const { email, password } = req.body;

    const passHash = await PasswordCrypto.hashPassword(password)

    const user = await AppDataSource.getRepository(Users).findOne({
        where: {
            email: email
        }
    }) 

    if (user) {
        // return res.json({message: 'E-mail já cadastrado'})
    }
    const newUser = new Users()
    newUser.email = email
    newUser.password = passHash
    newUser.admin = true

     await AppDataSource.manager.save(newUser)
     return res.json({newUser: newUser})

})

export default route;