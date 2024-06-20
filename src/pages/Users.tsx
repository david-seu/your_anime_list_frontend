import { AlertColor, Box } from '@mui/material'
import { useState } from 'react'
import CustomizedSnackbars from '../components/CustomizedSnackBars'
import UserTable from '../components/UserTable'
import useHandleDeleteUser from '../hooks/useHandleDeleteUser'
import StyledButton from '../components/StyledButton'
import LinkButton from '../components/LinkButton'

export default function Users() {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarType, setSnackbarType] = useState('')
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const handleDelete = useHandleDeleteUser({
    setSnackbarOpen,
    setSnackbarType,
    setSnackbarMessage,
  })

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: 20 }}>
      <Box
        sx={{
          display: 'flex',
          marginBottom: 2,
        }}
      >
        <StyledButton onClick={handleDelete}>Delete Users</StyledButton>
        <LinkButton to="/user/add">Add User</LinkButton>
      </Box>

      <UserTable />
      <CustomizedSnackbars
        open={snackbarOpen}
        type={snackbarType as AlertColor}
        message={snackbarMessage}
        handleClose={() => setSnackbarOpen(false)}
      />
    </Box>
  )
}
