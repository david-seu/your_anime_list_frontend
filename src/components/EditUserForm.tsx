import { Form } from 'react-bootstrap'
import { useState } from 'react'
import { AlertColor, InputLabel, MenuItem, Select } from '@mui/material'
import CustomizedSnackbars from './CustomizedSnackBars'
import useFetchUserById from '../hooks/useFetchUserById'
import useEditUser from '../hooks/useEditUser'
import StyledButton from './StyledButton'

interface EditAnimeFormProps {
  id: string
}

export default function EditAnimeForm({ id }: EditAnimeFormProps) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarType, setSnackbarType] = useState('')
  const [snackbarMessage, setSnackbarMessage] = useState('')

  useFetchUserById({
    id,
    setUsername,
    setEmail,
    setPassword,
    setRole,
  })

  const handleSubmit = useEditUser({
    id,
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
      <Form className="form">
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            className="input"
            value={username}
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label className="">Email</Form.Label>
          <Form.Control
            className="input"
            type="email"
            value={email}
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label className="">Password</Form.Label>
          <Form.Control
            className="input"
            type="password"
            value={password}
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formRole">
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
        </Form.Group>
        <StyledButton onClick={(e) => handleSubmit(e)} type="submit">
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
