import { Form } from 'react-bootstrap'
import { AlertColor } from '@mui/material'
import { useState } from 'react'
import CustomizedSnackbars from './CustomizedSnackBars'
import useConfirmLogin from '../hooks/userConfirmLogin'
import StyledButton from './StyledButton'

export default function ConfirmLoginForm() {
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

  return (
    <div>
      <Form className="gap-2 form">
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label style={{ color: '#39A0ED' }}>
            Enter 6-digit Code from email
          </Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter 6-digit code"
            className="input"
            required
            onChange={(e) => setCode(Number(e.target.value))}
          />
        </Form.Group>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <StyledButton
            onClick={handleSubmit}
            style={{
              width: '50%',
            }}
          >
            Confirm Login
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
