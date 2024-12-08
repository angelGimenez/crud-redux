import { UserId, UserName, UserEmail, UserGithub } from '../utils/types'
import { useAppDispatch } from './useStore.ts'
import { addNewUser, deleteUserById } from '../store/sliceUser.ts'

export const useDispatchUsersActions = () => {
  const dispatch = useAppDispatch()

  const dispatchAddNewUser = (name: UserName, email: UserEmail, github: UserGithub) => {
    dispatch(addNewUser({ name, email, github }))
  }
  const dispatchDeleteUserById = (id: UserId) => {
    dispatch(deleteUserById(id))
  }

  return { dispatchAddNewUser, dispatchDeleteUserById }
}
