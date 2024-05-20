import { SetStateAction, Dispatch } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../services/AuthService'
import User from '../data/User'

interface UseAddUserProps {
  username: string
  password: string
  email: string
  setSnackbarOpen: Dispatch<SetStateAction<boolean>>
  setSnackbarType: Dispatch<SetStateAction<string>>
  setSnackbarMessage: Dispatch<SetStateAction<string>>
}

const useAddUser = ({
  username,
  password,
  email,
  setSnackbarOpen,
  setSnackbarType,
  setSnackbarMessage,
}: UseAddUserProps) => {
  const navigate = useNavigate()

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    const id = -1

    const newUser: User = {
      id,
      username,
      password,
      email,
      token: '',
    }

    signup(newUser)
      .then((result) => {
        if (result.status === 404) {
          setSnackbarType('error')
          setSnackbarMessage('Failed to add user')
        } else {
          navigate('/')
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
