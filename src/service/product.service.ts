import { AppDataSource } from "../data-source";
import { IProd } from "../dto/IProd";
import { Products } from "../entity/Product";


 export async function createProduct(newProduct: IProd) {
    if (typeof newProduct.amount != "number") {
        return ("Quantidade precisa ser um numero");
    }
    const product = await AppDataSource.getRepository(Products).findOne({
        where: {
            name: newProduct.name.toUpperCase(),
        },
    });
    
    if (product) {        
        return  ("Produto já cadastrado")
    }
    const newProd:IProd = new Products();
    newProd.name = newProduct.name.toUpperCase();
    newProd.color = newProduct.color;
    newProd.abount = newProduct.abount;
    newProd.mark = newProduct.mark;
    newProd.amount = newProduct.amount as number;
    
    await AppDataSource.manager.save(newProd);
    
    return (newProd);
}

export async function findAllProd() {
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
    return (productsStock);
}

export async function findByIdProd(id:string) {    
const product:IProd = await AppDataSource.getRepository(Products).findOne({
    where: {
        id: id,
    },
});
if (!product) {
    return "Produto não encontrado. :/";
}
if (product.amount <= 0) {
    product.noStock = true
    return product
}
product.noStock = false
return product
}

export async function findByNameProd(name:string) {
    const product:Array<IProd> = await AppDataSource.getRepository(Products).query(`
    SELECT * FROM Products
    WHERE name LIKE '%${name.toUpperCase()}%'
    `);
        if (product.length === 0) {
            return `Nenhum produto encontrado para sua busca: '${name}' :/`
        }
        const productsWithStock = []
        product.map((prod:IProd) => {
            if (prod.amount > 0) {
                productsWithStock.push(prod)
            }
        })
        return productsWithStock 
}

export async function buyProd(id:string) {
        const findProduct = await AppDataSource.getRepository(Products).findOne({
            where: {
                id: id,
            },
        });
        findProduct.amount = findProduct.amount - 1;
        await AppDataSource.manager.save(findProduct);
        return findProduct
}