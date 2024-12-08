import { Card, Title, TextInput, Button, Badge } from '@tremor/react'
import { useState } from 'react'
import { useDispatchUsersActions } from '../hooks/useDispatchUserActions.ts'

export function CreateNewUser() {
  const { dispatchAddNewUser } = useDispatchUsersActions()
  const [result ,setResult] = useState<'OK' | 'KO' | null>(null)
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setResult(null)

    const form = event.currentTarget
    const formData = new FormData(form)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const github = formData.get('github') as string

    if (!name || !email || !github) {
      return setResult('KO')
    }

    dispatchAddNewUser(name, email, github)
    setResult('OK')
    form.reset()
  }

  return (
    <Card style={{ marginTop: '16px' }}>
      <Title>Crear nuevo usuario</Title>
      <form onSubmit={handleSubmit}>
        <TextInput name='name' placeholder='Aquí el nombre' />
        <TextInput name='email' placeholder='Aquí el email' />
        <TextInput name='github' placeholder='Aquí el usuario de Github' />

        <div>
          <Button type='submit' style={{ marginTop: '16px' }}>Crear usuario</Button>
          <span>
            { result === 'OK' && <Badge style={{ color: 'green', marginLeft: '10px'}}>Guardado correctamente</Badge> }
            { result === 'KO' && <Badge style={{ color: 'red', marginLeft: '10px'}}>Error con los campos</Badge> }
          </span>
        </div>
      </form>
    </Card>
  )
}
