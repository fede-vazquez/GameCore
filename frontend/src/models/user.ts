export interface UserModel {
	id: number
	username: string
	email: string
	role: string
}

export type RegisterModel = Pick<UserModel, 'id' | 'email' | 'username'>
export type LoginModel = { token: string; user: RegisterModel }
