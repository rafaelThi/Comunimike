import { AppDataSource } from "../data-source";
import { IEditUser, IRecover, IUser } from "../dto/dtosUser";
import { Users } from "../entity/Users";
import { PasswordCrypto } from "../utils/passwordCrypto";



export async function createCliente (user: IUser) {  
        const passHash = await PasswordCrypto.hashPassword(user.password);
        const userfind = await AppDataSource.getRepository(Users).findOne({
            where: {
                email: user.email,
            },
        });
        
        if (userfind) {
            return "E-mail já cadastrado";
        }
        const newUser = new Users();
        newUser.name = user.name;
        newUser.email = user.email;
        newUser.password = passHash;
        newUser.active = user.active;
        newUser.admin = false;
        
        await AppDataSource.manager.save(newUser);
        delete newUser.password
        return newUser
}

export async function createAdmin (user: IUser) {
        const passHash = await PasswordCrypto.hashPassword(user.password);
        const userAdm= await AppDataSource.getRepository(Users).findOne({
            where: {
                email: user.email,
            },
        });
        
        if (userAdm) {
            return 'E-mail já cadastrado'
        }
        const newUser = new Users();
        newUser.name = user.name;
        newUser.email = user.email;
        newUser.password = passHash;
        newUser.active = user.active;
        newUser.admin = true;
        
        await AppDataSource.manager.save(newUser);
        delete newUser.password
        return newUser
}

export async function editUser (editUser: IEditUser) {
        const userEdit = new Users();
        userEdit.name = editUser.name;
        userEdit.email = editUser.newEmail;

        const existUser: Users = await AppDataSource.getRepository(Users).findOne({
            where: {
                email: editUser.oldEmail,
            },
        });
        if (!existUser) {
            return 'Usuário não encontrado'
        }
        await AppDataSource.manager.createQueryBuilder()
        .update(Users)
        .set(userEdit)
        .where( "email = :oldEmail", {oldEmail: editUser.oldEmail})
        .execute()
        
        const findUser: Users = await AppDataSource.getRepository(Users).findOne({
            where: {
                email: editUser.newEmail,
            },
        });
        delete findUser.password
        return  findUser

}

export async function recoverUser (recoverPasswordUser: IRecover) {      
        const passHash = await PasswordCrypto.hashPassword(recoverPasswordUser.newPassword);

        const recoverPassUser = new Users();
        recoverPassUser.password = passHash;
        
        const existUser: Users = await AppDataSource.getRepository(Users).findOne({
            where: {
                email: recoverPasswordUser.email,
            },
        });
        if (!existUser) {
            return 'Usuário não encontrado'
        }

        await AppDataSource.manager.createQueryBuilder()
        .update(Users)
        .set(recoverPassUser)
        .where( "email = :email", {email: recoverPasswordUser.email})
        .execute()

        const findUser: Users = await AppDataSource.getRepository(Users).findOne({
            where: {
                email: recoverPasswordUser.email,
            },
        });
        delete findUser.password
        return findUser ;
}

export async function deleteUser (email: string) {
        const userDelete = new Users();
        userDelete.active = false;
        
        const existUser: Users = await AppDataSource.getRepository(Users).findOne({
            where: {
                email: email,
            },
        });
        if (existUser.active === false) {
            return 'Usuário já inativo'
        }

        await AppDataSource.manager.createQueryBuilder()
        .update(Users)
        .set(userDelete)
        .where( "email = :email", {email: email})
        .execute()

        const findUser: Users = await AppDataSource.getRepository(Users).findOne({
            where: {
                email: email,
            },
        });
        if (findUser.active === false) {
            return 'Usuário inativado'
        }
        throw new Error('Algo deu erro, tentar novamente');        

}