import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import HomeIcon from '@mui/icons-material/Home'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import useUserStore from '../store/useUserStore'
import ExpandLinkButton from './ExpandLinkButton'
import User from '../data/User'
import LinkButton from './LinkButton'
import useSignOut from '../hooks/useSignOut'
import StyledButton from './StyledButton'

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

  const handleSignOut = () => {
    signOut()
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        color="transparent"
        sx={{ backgroundColor: '#0B3954', boxShadow: 3 }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {!user && <ExpandLinkButton to="/signup">Sign Up</ExpandLinkButton>}
          {!user && <LinkButton to="/login">Sign In</LinkButton>}
          {user && (
            <ExpandLinkButton to="/anime/mine">
              Your Anime List
            </ExpandLinkButton>
          )}
          {user && user.role !== 'ROLE_USER' && (
            <>
              <StyledButton onClick={handleClick}>
                <AddIcon />
              </StyledButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{
                  '& .MuiPaper-root': {
                    backgroundColor: '#0B3954', // Background color of the menu
                    color: '#39A0ED', // Text color of the menu
                  },
                }}
              >
                <MenuItem
                  onClick={handleClose}
                  sx={{
                    backgroundColor: '#0B3954', // Background color of the item
                    color: '#39A0ED', // Text color of the item
                    '&:hover': {
                      backgroundColor: '#39A0ED', // Background color on hover
                      color: '#0B3954', // Text color on hover
                    },
                    '& a': {
                      color: 'inherit', // Ensure the link inherits the text color
                      textDecoration: 'none', // Remove underline from link
                      display: 'block', // Ensure link covers the whole MenuItem
                      width: '100%',
                      height: '100%',
                    },
                  }}
                >
                  <Link to="/anime/new">Add Anime</Link>
                </MenuItem>
              </Menu>
            </>
          )}
          {user && user.role === 'ROLE_ADMIN' && (
            <ExpandLinkButton to="/user">Users</ExpandLinkButton>
          )}
          <LinkButton to="/">
            <HomeIcon />
          </LinkButton>
          <LinkButton to="/anime">Browse</LinkButton>
          {user && (
            <StyledButton onClick={handleSignOut}>Sign Out</StyledButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
