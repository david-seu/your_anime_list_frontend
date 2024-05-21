import { useEffect, useState } from 'react'
import { AlertColor } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import CustomizedSnackbars from '../components/CustomizedSnackBars'
import ConfirmLoginForm from '../components/ConfirmLoginForm'
import useConfirmLogin from '../hooks/userConfirmLogin'
// eslint-disable-next-line import/no-named-as-default
import useUserStore from '../store/useUserStore'

export default function ConfirmLogin() {
  const [code, setCode] = useState(0)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarType, setSnackbarType] = useState('')
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const handleSubmit = useConfirmLogin({
    code,
    setSnackbarOpen,
    setSnackbarType,
    setSnackbarMessage,
  })

  const user = useUserStore((state) => state.user)!
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user, navigate])

  return (
    <div>
      <ConfirmLoginForm setCode={setCode} handleSubmit={handleSubmit} />
      <CustomizedSnackbars
        open={snackbarOpen}
        type={snackbarType as AlertColor}
        message={snackbarMessage}
        handleClose={() => setSnackbarOpen(false)}
      />
    </div>
  )
}
