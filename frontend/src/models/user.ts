export interface UserModel {
	id: number
	username: string
	email: string
	rol: string
	rolId: number
}

export type LoginModel = { token: string; user: UserModel }
