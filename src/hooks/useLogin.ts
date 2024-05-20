import { SetStateAction, Dispatch } from 'react'
import { useNavigate } from 'react-router-dom'
import { signin } from '../services/AuthService'
// eslint-disable-next-line import/no-named-as-default
import useUserStore from '../store/useUserStore'
import User from '../data/User'

interface UseLoginProps {
  username: string
  password: string
  setSnackbarOpen: Dispatch<SetStateAction<boolean>>
  setSnackbarType: Dispatch<SetStateAction<string>>
  setSnackbarMessage: Dispatch<SetStateAction<string>>
}

const useLogin = ({
  username,
  password,
  setSnackbarOpen,
  setSnackbarType,
  setSnackbarMessage,
}: UseLoginProps) => {
  const signIn = useUserStore((state) => state.signIn)
  const navigate = useNavigate()

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    signin(username, password)
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
          const user: User = {
            id: result.data.id,
            username: result.data.username,
            email: result.data.email,
            token: result.data.token,
            password: '',
          }
          console.log(user)
          signIn(result.data)
          navigate('/home')
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
