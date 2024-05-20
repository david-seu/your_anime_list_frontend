import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import HandlerButton from './HandlerButton'
import useSignOut from '../hooks/useSignOut'

export default function CustomNavBar() {
  const handleSignOut = useSignOut()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <HandlerButton onClick={handleSignOut}>Sign Out</HandlerButton>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
