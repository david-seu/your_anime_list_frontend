import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import HomeIcon from '@mui/icons-material/Home'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import useUserStore from '../store/useUserStore'
import ExpandLinkButton from './ExpandLinkButton'
import User from '../data/User'
import LinkButton from './LinkButton'
import useSignOut from '../hooks/useSignOut'
import StyledButton from './StyledButton'
import { Link } from 'react-router-dom'

export default function CustomNavBar() {
  const user = useUserStore((state) => state.currentUser) as User

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const signOut = useSignOut()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        color="transparent"
        sx={{ backgroundColor: '#0B3954', boxShadow: 3 }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {!user && <ExpandLinkButton to="/signup">Sign Up</ExpandLinkButton>}
          {!user && <LinkButton to="/">Sign In</LinkButton>}
          {user && (
            <ExpandLinkButton to="/anime/mine">
              Your Anime List
            </ExpandLinkButton>
          )}
          {user && user.role !== 'ROLE_USEr' && (
            <>
              <StyledButton onClick={handleClick}>
                <AddIcon />
              </StyledButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link to="/anime/new">Add Anime</Link>
                </MenuItem>
              </Menu>
            </>
          )}
          {user && user.role === 'ROLE_ADMIN' && (
            <ExpandLinkButton to="/user">Users</ExpandLinkButton>
          )}
          <LinkButton to="/home">
            <HomeIcon />
          </LinkButton>
          {user && <StyledButton onClick={signOut}>Sign Out</StyledButton>}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
