import { store } from "../store/store.ts"

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type UserId = string
export type UserName = string
export type UserEmail = string
export type UserGithub = string

export interface User {
  name: UserName
  email: UserEmail
  github: UserGithub
}

export interface UserWithId extends User {
  id: UserId
}
