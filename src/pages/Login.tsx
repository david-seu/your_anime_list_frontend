import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AlertColor } from '@mui/material'
import CustomizedSnackbars from '../components/CustomizedSnackBars'
import useLogin from '../hooks/useLogin'
import LoginForm from '../components/LoginForm'
import LinkButton from '../components/LinkButton'

export default function Login() {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarType, setSnackbarType] = useState('')
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const handleSubmit = useLogin({
    username,
    password,
    setSnackbarOpen,
    setSnackbarType,
    setSnackbarMessage,
  })

  return (
    <div>
      <h1>Login</h1>
      <div className="add--container">
        <LoginForm
          setUsername={setUsername}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
        />
        <CustomizedSnackbars
          open={snackbarOpen}
          type={snackbarType as AlertColor}
          message={snackbarMessage}
          handleClose={() => setSnackbarOpen(false)}
        />
      </div>
      <LinkButton to="/register">Register</LinkButton>
    </div>
  )
}