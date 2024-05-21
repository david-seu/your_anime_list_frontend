import { useNavigate } from 'react-router-dom'
import { Dispatch, SetStateAction } from 'react'
import { confirmLogin } from '../services/AuthService'
import useUserStore from '../store/useUserStore'

interface UseConfirmLoginProps {
  code: number
  setSnackbarOpen: Dispatch<SetStateAction<boolean>>
  setSnackbarType: Dispatch<SetStateAction<string>>
  setSnackbarMessage: Dispatch<SetStateAction<string>>
}

const useConfirmLogin = ({
  code,
  setSnackbarOpen,
  setSnackbarType,
  setSnackbarMessage,
}: UseConfirmLoginProps) => {
  const navigate = useNavigate()

  const signIn = useUserStore((state) => state.signIn)

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    confirmLogin(code)
      .then((result) => {
        if (result.status === 200) {
          signIn(result.data)
          setSnackbarType('success')
          setSnackbarMessage('User logged successfully')
          setSnackbarOpen(true)
          navigate('/home')
        } else if (result.status === 404) {
          setSnackbarType('error')
          setSnackbarMessage(result.data)
          setSnackbarOpen(true)
        }
      })
      .catch((error) => {
        setSnackbarType('error')
        setSnackbarMessage(error.response.data)
        setSnackbarOpen(true)
      })
  }

  return handleSubmit
}

export default useConfirmLogin
