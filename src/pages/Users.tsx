import { AlertColor } from '@mui/material'
import { useState } from 'react'
import CustomizedSnackbars from '../components/CustomizedSnackBars'
import UserTable from '../components/UserTable'
import useHandleDeleteUser from '../hooks/useHandleDeleteUser'
import StyledButton from '../components/StyledButton'
import ExpandLinkButton from '../components/ExpandLinkButton'

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
    <div className="container-fluid">
      <div>
        <StyledButton onClick={handleDelete}>Delete Users</StyledButton>
        <ExpandLinkButton to="/user/add">Add User</ExpandLinkButton>
      </div>

      <UserTable />
      <CustomizedSnackbars
        open={snackbarOpen}
        type={snackbarType as AlertColor}
        message={snackbarMessage}
        handleClose={() => setSnackbarOpen(false)}
      />
    </div>
  )
}
