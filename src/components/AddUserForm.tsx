import { useState } from 'react'
import { Form } from 'react-bootstrap'
import { AlertColor, InputLabel, MenuItem, Select } from '@mui/material'
import CustomizedSnackbars from './CustomizedSnackBars'
import useAddUser from '../hooks/useAddUser'
import StyledButton from './StyledButton'

export default function AddUserForm() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarType, setSnackbarType] = useState('')
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const handleSubmit = useAddUser({
    username,
    email,
    password,
    role,
    setSnackbarOpen,
    setSnackbarType,
    setSnackbarMessage,
  })

  return (
    <div>
      <Form noValidate className="gap-2 form">
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            className="input"
            type="text"
            placeholder="Enter username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            className="input"
            type="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="input"
            type="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formUsername">
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            id="role-select"
            value={role || ''}
            onChange={(e: any) => setRole(e.target.value as string)}
            name="role"
          >
            <MenuItem value="ROLE_ADMIN">Admin</MenuItem>
            <MenuItem value="ROLE_USER">User</MenuItem>
            <MenuItem value="ROLE_MANAGER">Manager</MenuItem>
          </Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <StyledButton onClick={handleSubmit} type="submit">
          Submit
        </StyledButton>
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
