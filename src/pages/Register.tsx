import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AlertColor } from '@mui/material'
import CustomizedSnackbars from '../components/CustomizedSnackBars'
import useAddUser from '../hooks/useAddUser'
import AddUserForm from '../components/AddUserForm'
import LinkButton from '../components/LinkButton'

export default function Register() {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarType, setSnackbarType] = useState('')
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const handleSubmit = useAddUser({
    username,
    password,
    email,
    setSnackbarOpen,
    setSnackbarType,
    setSnackbarMessage,
  })

  return (
    <div>
      <LinkButton to="/">Back</LinkButton>
      <div className="add--container">
        <AddUserForm
          setUsername={setUsername}
          setPassword={setPassword}
          setEmail={setEmail}
          handleSubmit={handleSubmit}
        />
        <CustomizedSnackbars
          open={snackbarOpen}
          type={snackbarType as AlertColor}
          message={snackbarMessage}
          handleClose={() => setSnackbarOpen(false)}
        />
      </div>
    </div>
  )
}
