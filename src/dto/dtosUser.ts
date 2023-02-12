export interface IEditUser {
    oldEmail: string;
    newEmail: string;
    name: string;
}

export interface IRecover {
    email: string;
    newPassword: string;
}

export interface IUser {
    id: string
    name: string,
    email: string,
    password: string,
    active: boolean,
    admin: boolean
}