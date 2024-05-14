import { SetStateAction, Dispatch } from 'react'
import { addUser } from '../services/UserService'
import User from '../data/User'

interface UseAddUserProps {
  username: string
  password: string
  email: string
  fullName: string
  setSnackbarOpen: Dispatch<SetStateAction<boolean>>
  setSnackbarType: Dispatch<SetStateAction<string>>
  setSnackbarMessage: Dispatch<SetStateAction<string>>
}

const useAddUser = ({
  username,
  password,
  email,
  fullName,
  setSnackbarOpen,
  setSnackbarType,
  setSnackbarMessage,
}: UseAddUserProps) => {
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    const id = -1

    const newUser: User = {
      id,
      username,
      password,
      email,
      fullName,
    }

    addUser(newUser)
      .then((result) => {
        if (result.status !== 201) {
          setSnackbarType('error')
          setSnackbarMessage('Failed to add user')
        } else {
          setSnackbarType('success')
          setSnackbarMessage('Successfully added user')
        }
      })
      .catch(() => {
        setSnackbarType('warning')
        setSnackbarMessage('Server is down, please try again later')
      })
      .finally(() => {
        setSnackbarOpen(true)
      })
  }

  return handleSubmit
}

export default useAddUser
