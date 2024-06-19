import { Form } from 'react-bootstrap'
import { AlertColor } from '@mui/material'
import { useState } from 'react'
import CustomizedSnackbars from './CustomizedSnackBars'
import useSignUp from '../hooks/useSignUp'
import StyledButton from './StyledButton'
import '../App.css'

export default function SignUpForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarType, setSnackbarType] = useState('')
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const handleSubmit = useSignUp({
    username,
    password,
    email,
    role,
    setSnackbarOpen,
    setSnackbarType,
    setSnackbarMessage,
  })

  return (
    <Form className="gap-2 form">
      <Form.Group className="mb-3" controlId="formName">
        <Form.Control
          className="input"
          type="text"
          placeholder="Username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Control
          className="input"
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Control
          className="input"
          type="password"
          placeholder="Password"
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
          Sign Up
        </StyledButton>
      </div>
      <CustomizedSnackbars
        open={snackbarOpen}
        type={snackbarType as AlertColor}
        message={snackbarMessage}
        handleClose={() => setSnackbarOpen(false)}
      />
    </Form>
  )
}
