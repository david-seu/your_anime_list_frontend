/* eslint-disable import/no-named-as-default */
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  AlertColor,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
  Typography,
} from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AddIcon from '@mui/icons-material/Add'
import TagIcon from '@mui/icons-material/Tag'
import ExpandLinkButton from '../components/ExpandLinkButton'
import useFetchAnimeById from '../hooks/useFetchAnimeById'
import Anime from '../data/Anime'
import useUserStore from '../store/useUserStore'
import useDeleteAnime from '../hooks/useDeleteAnime'
import StyledButton from '../components/StyledButton'
import CustomizedSnackbars from '../components/CustomizedSnackBars'

export default function ViewAnime(): JSX.Element {
  const [anime, setAnime] = useState<Anime>()
  const user = useUserStore((state) => state.currentUser)!
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarType, setSnackbarType] = useState('')
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [popoverOpen, setPopoverOpen] = useState(false)

  const { id } = useParams<{ id: string }>() as unknown as { id: string }

  const fetchAnimeById = useFetchAnimeById({
    id,
    setAnime,
  })

  useEffect(() => {
    fetchAnimeById()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleStatsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const [anchorStudiosEl, setAnchorStudioEl] = useState(null)

  const handlePopoverStudiosOpen = (event: any) => {
    setAnchorStudioEl(event.currentTarget)
  }

  const handlePopoverStudiosClose = () => {
    setAnchorStudioEl(null)
  }

  const handleTagsClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleFavorite = () => {
    console.log('Favorite anime')
  }

  const removeAnime = useDeleteAnime({
    setSnackbarOpen,
    setSnackbarType,
    setSnackbarMessage,
  })

  const handleAdd = () => {
    console.log('Add anime to user list')
  }

  const handleRemoveClick = () => {
    console.log('Remove anime from user list')
    removeAnime(anime!)
  }

  return (
    <div>
      <Typography variant="h4" component="div" align="center" gutterBottom>
        {anime?.title}
      </Typography>
      <Card
        sx={{
          display: 'flex',
          backgroundColor: '#333',
          color: 'white',
          borderRadius: 0,
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: 300 }}
          image={anime?.pictureURL} // replace with the path to your image
          alt={anime?.title}
        />
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography variant="h3" component="div">
            <Icon component={TagIcon} /> {anime?.popularity}
          </Typography>
          <Typography variant="h5" component="div">
            Score: {anime?.score}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            sx={{
              height: '100px',
            }}
          >
            {anime?.synopsis}
          </Typography>
          {user && (
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: '#0B3954' }}
                  startIcon={<AddIcon />}
                  onClick={handleAdd}
                >
                  Add to List
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  // eslint-disable-next-line react/jsx-no-undef
                  startIcon={<FavoriteIcon />}
                  onClick={handleFavorite}
                >
                  Favorite
                </Button>
              </Grid>
              {(user.role === 'ROLE_ADMIN' || user.role === 'ROLE_MANAGER') && (
                <Grid item>
                  <ExpandLinkButton to={`/anime/edit/${id}`}>
                    Edit
                  </ExpandLinkButton>
                </Grid>
              )}
              {(user.role === 'ROLE_ADMIN' || user.role === 'ROLE_MANAGER') && (
                <Grid item>
                  <IconButton onClick={() => setPopoverOpen(true)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                </Grid>
              )}
            </Grid>
          )}
        </CardContent>
      </Card>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={3}>
          <Typography variant="subtitle1" color="text.secondary">
            Type: {anime?.type}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="subtitle1" color="text.secondary">
            Episodes: {anime?.nrEpisodes}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="subtitle1" color="text.secondary">
            Status: {anime?.status}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="subtitle1" color="text.secondary">
            Start Date: {anime?.startDate}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="subtitle1" color="text.secondary">
            End Date: {anime?.endDate}
          </Typography>
        </Grid>
      </Grid>
      <Button variant="contained" onClick={handleStatsClick}>
        Show Stats
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Watching: {anime?.watching}</MenuItem>
        <MenuItem onClick={handleClose}>Dropped: {anime?.dropped}</MenuItem>
        <MenuItem onClick={handleClose}>On Hold: {anime?.onHold}</MenuItem>
        <MenuItem onClick={handleClose}>
          Plan to Watch: {anime?.planToWatch}
        </MenuItem>
      </Menu>
      <Button
        variant="contained"
        onMouseOver={handlePopoverStudiosOpen}
        onMouseOut={handlePopoverStudiosClose}
      >
        Studios
      </Button>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={Boolean(anchorStudiosEl)}
        anchorEl={anchorStudiosEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverStudiosClose}
        disableRestoreFocus
      >
        <List>
          {anime?.studios.map((studio, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <ListItem key={index}>
              <ListItemText primary={studio} />
            </ListItem>
          ))}
        </List>
      </Popover>
      <Button variant="contained" onClick={handleTagsClick}>
        Show Tags
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {anime?.tags.map((tag, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <MenuItem key={index} onClick={handleClose}>
            {tag}
          </MenuItem>
        ))}
      </Menu>
      <Popover
        open={popoverOpen}
        sx={{
          backgroundColor: 'transparent',
          '.MuiPaper-root': {
            backgroundColor: '#0B3954',
            borderRadius: '10px',
            border: '1px solid #1a1a1a',
            boxShadow: '0px 0px 10  px 0px #1a1a1a',
          },
        }}
        onClose={() => setPopoverOpen(false)}
      >
        <Box
          sx={{
            backgroundColor: '#0B3954',
            borderRadius: '10px',
            border: '5px solid #1a1a1a',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ color: '#39A0ED' }}>
            Are you sure you want to delete this Anime? <br />
            PS. This action is irreversible. People are going to be sad.
          </Typography>
          <StyledButton
            onClick={() => {
              handleRemoveClick()
              setPopoverOpen(false)
            }}
          >
            Yes
          </StyledButton>
          <StyledButton onClick={() => setPopoverOpen(false)}>No</StyledButton>
        </Box>
      </Popover>
      <CustomizedSnackbars
        open={snackbarOpen}
        type={snackbarType as AlertColor}
        message={snackbarMessage}
        handleClose={() => setSnackbarOpen(false)}
      />
    </div>
  )
}
