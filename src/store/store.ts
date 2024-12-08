import { type Middleware, configureStore } from '@reduxjs/toolkit'
import { toast } from 'sonner'
import { usersReducer, rollbackUser } from './sliceUser.ts'

// Guarda en local
const persistanceLocalStorageMiddleware: Middleware = store => next => action => {
  next(action)
  localStorage.setItem('__redux_state__', JSON.stringify(store.getState()))
}

// Guarda en API / BBDD
const syncWithDatabaseMiddleware: Middleware = store => next => action => {
  const { type, payload } = action
  const previousState = store.getState()

  next(action)

  if (type === 'users/deleteUserById') {
    const userIdToRemove = payload
    const userToRemove = previousState.users.find(user => user.id === userIdToRemove)

    fetch(`https://jsonplaceholder.typicode.com/users/${payload}`, {
      method: 'DELETE'
    })
    .then(res => {
      if (res.ok) toast.success(`Usuario ${payload} eliminado correctamente`)
      // throw new Error('Error al eliminar el usuario') // Para testear el rollback
    })
    .catch(error => {
      toast.error(`Error al borrar el usuario ${userIdToRemove}`)
      if (userToRemove) store.dispatch(rollbackUser(userToRemove))
      console.log(error)
    })
  }
}

export const store = configureStore({
  reducer: {
    users: usersReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware)
})
