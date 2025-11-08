export interface UserModel {
	Id: number
	Username: string
	Email: string
	Rol: string
}

export type RegisterModel = Pick<UserModel, 'Id' | 'Email' | 'Username'>
export type LoginModel = { Token: string; User: RegisterModel }
