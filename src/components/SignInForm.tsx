import { Form } from 'react-bootstrap'
import { useState } from 'react'
import { AlertColor } from '@mui/material'
import CustomizedSnackbars from './CustomizedSnackBars'
import useSignIn from '../hooks/useSignIn'
import '../App.css'
import StyledButton from './StyledButton'

export default function SignInForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarType, setSnackbarType] = useState('')
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const handleSubmit = useSignIn({
    username,
    password,
    setSnackbarOpen,
    setSnackbarType,
    setSnackbarMessage,
  })

  return (
    <div>
      <Form className="gap-2 form">
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Control
            className="input"
            type="text"
            placeholder="Enter username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Control
            className="input"
            type="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <StyledButton
            onClick={handleSubmit}
            style={{
              width: '50%',
            }}
          >
            Login
          </StyledButton>
        </div>
      </Form>
      <CustomizedSnackbars
        open={snackbarOpen}
        type={snackbarType as AlertColor}
        message={snackbarMessage}
        handleClose={() => setSnackbarOpen(false)}
      />
    </div>
  )
}
