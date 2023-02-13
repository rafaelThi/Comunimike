import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { ILoging } from "../dto/dtoAuth";
import { Users } from "../entity/Users";


export async function createSession (login: ILoging) {
    const user: Users = await AppDataSource.getRepository(Users).findOne({
        where: {
            email: login.email,
        },
      });
      if (!user) {
        throw new Error('Usuário não encontrado');
      }
    
      const isMatch = await compare(login.password, user.password);
      if (!isMatch) {
        return "Dados incorretos, tente novamente."
    }
    const email = login.email
    const token = sign(email , "secretkey");
    return token
}