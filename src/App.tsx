import './styles.css'
import { ListOfUsers } from './components/ListOfUsers.tsx'
import { CreateNewUser } from './components/CreateNewUser.tsx'
import { Toaster } from 'sonner'

export function App() {
  return (
    <>
      <ListOfUsers />
      <CreateNewUser />
      <Toaster richColors />
    </>
  )
}
