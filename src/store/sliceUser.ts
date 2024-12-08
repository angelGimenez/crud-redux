import { DEFAULT_STATE } from '../utils/consts.ts'
import { UserId, User, UserWithId } from '../utils/types'
import { createSlice } from '@reduxjs/toolkit'

// Lee de local
const initialState: UserWithId[] = (() => {
  const persistedState = localStorage.getItem('__redux_state__')
  return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE
})()

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addNewUser: (state, action: { payload: User }) => {
      const id = crypto.randomUUID()
      state.push({id, ...action.payload }) // Con Immer
      //return [...state, { id, ...action.payload }] / Sin Immer
    },
    deleteUserById: (state, action: { payload: UserId }) => {
      const id = action.payload
      return state.filter(user => user.id !== id)
    },
    rollbackUser: (state, action: { payload: UserWithId }) => {
      const isUserAlreadyDefined = state.some(user => user.id === action.payload.id)
      if (!isUserAlreadyDefined) {
        state.push(action.payload) // Con Immer
        //return [...state, action.payload] // Sin Immer
      }
    }
  }
})

export const usersReducer = usersSlice.reducer
export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions
