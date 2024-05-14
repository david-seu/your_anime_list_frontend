import { SetStateAction, Dispatch } from 'react'
import { loginUser } from '../services/UserService'

interface UseLoginProps {
  email: string
  password: string
  setSnackbarOpen: Dispatch<SetStateAction<boolean>>
  setSnackbarType: Dispatch<SetStateAction<string>>
  setSnackbarMessage: Dispatch<SetStateAction<string>>
}

const useLogin = ({
  email,
  password,
  setSnackbarOpen,
  setSnackbarType,
  setSnackbarMessage,
}: UseLoginProps) => {
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    loginUser(email, password)
      .then((result) => {
        if (result.status === 400) {
          setSnackbarType('error')
          setSnackbarMessage('Failed to login')
        } else if (result.status === 401) {
          setSnackbarType('error')
          setSnackbarMessage('Invalid password')
        } else if (result.status === 404) {
          setSnackbarType('error')
          setSnackbarMessage('User not found')
        } else {
          setSnackbarType('success')
          setSnackbarMessage('Successfully logged in')
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

export default useLogin
