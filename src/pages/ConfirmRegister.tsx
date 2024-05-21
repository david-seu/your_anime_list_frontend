import { useState } from 'react'
import { AlertColor } from '@mui/material'
import ConfirmRegisterForm from '../components/ConfirmRegisterForm'
import useConfirmRegister from '../hooks/useConfirmRegister'
import CustomizedSnackbars from '../components/CustomizedSnackBars'

export default function ConfirmRegister() {
  const [token, setToken] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarType, setSnackbarType] = useState('')
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const handleSubmit = useConfirmRegister({
    token,
    setSnackbarOpen,
    setSnackbarType,
    setSnackbarMessage,
  })

  return (
    <div>
      <ConfirmRegisterForm setToken={setToken} handleSubmit={handleSubmit} />
      <CustomizedSnackbars
        open={snackbarOpen}
        type={snackbarType as AlertColor}
        message={snackbarMessage}
        handleClose={() => setSnackbarOpen(false)}
      />
    </div>
  )
}
