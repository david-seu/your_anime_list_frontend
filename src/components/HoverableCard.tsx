/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/destructuring-assignment */
import {
  AlertColor,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Popover,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Add as AddIcon } from '@mui/icons-material' // Import AddIcon
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import Anime from '../data/Anime'
import EditAnimeDialog from './EditAnimeDialog'
import AnimeUser from '../data/AnimeUser'
import useEditAnimeUser from '../hooks/useEditAnimeUser'
import useAddAnimeUser from '../hooks/useAddAnimeUser'
import useFetchAnimeUserById from '../hooks/useFetchAnimeUserById'
import CustomizedSnackbars from './CustomizedSnackBars'
import useUserStore from '../store/useUserStore'
import useDeleteAnime from '../hooks/useDeleteAnime'
import StyledButton from './StyledButton'

export default function HoverableCard(item: Anime) {
  const user = useUserStore((state) => state.currentUser)
  const [anchorEl, setAnchorEl] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedAnime, setSelectedAnime] = useState<AnimeUser | null>(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarType, setSnackbarType] = useState('')
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [popoverOpen, setPopoverOpen] = useState(false)

  const getAnimeUser = useFetchAnimeUserById({ setAnime: setSelectedAnime })

  const navigate = useNavigate()

  const handleAddClick = (anime: Anime) => {
    getAnimeUser(anime.id)
    setOpenDialog(true)
  }

  const removeAnime = useDeleteAnime({
    setSnackbarOpen,
    setSnackbarType,
    setSnackbarMessage,
  })

  const handleRemoveClick = (anime: Anime) => {
    console.log('Remove anime from user list')
    removeAnime(anime)
  }

  const updateAnimeUser = useEditAnimeUser({
    animeUser: selectedAnime!,
    setSnackbarOpen,
    setSnackbarType,
    setSnackbarMessage,
  })

  const addAnimeUser = useAddAnimeUser({
    animeUser: selectedAnime!,
    setSnackbarOpen,
    setSnackbarType,
    setSnackbarMessage,
  })

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedAnime(null)
  }

  const handleSave = () => {
    // Logic to save the anime user
    console.log('Save changes for:', selectedAnime)
    if (selectedAnime?.id === 0) {
      console.log('Add anime to user list')
      addAnimeUser()
    } else {
      console.log('Update anime in user list')
      updateAnimeUser()
    }
    setOpenDialog(false)
  }

  const handlePopoverOpen = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <div style={{ backgroundColor: 'transparent' }}>
      <Card
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        className="hoverable-card"
      >
        <CardMedia
          component="img"
          height="200"
          image={item.pictureURL}
          alt={item.title}
          onClick={() => navigate(`/anime/${item.id}`)}
        />
        <CardContent>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {user && (
              <IconButton onClick={() => handleAddClick(item)}>
                <AddIcon />
              </IconButton>
            )}
            {user?.role !== 'ROLE_USER' && (
              <IconButton onClick={() => setPopoverOpen(true)}>
                <DeleteOutlineIcon />
              </IconButton>
            )}
            <Typography variant="body2" color="#39A0ED">
              {item.title}
            </Typography>
          </div>
        </CardContent>
      </Card>
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
              handleRemoveClick(item)
              setPopoverOpen(false)
            }}
          >
            Yes
          </StyledButton>
          <StyledButton onClick={() => setPopoverOpen(false)}>No</StyledButton>
        </Box>
      </Popover>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
          '.MuiPaper-root': {
            backgroundColor: '#0B3954',
            borderRadius: '10px',
            boxShadow: 'none',
          },
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Box p={2} className="popover-card">
          <Typography variant="body1">
            {item.animeSeason.season} {item.animeSeason.year}
          </Typography>
          <Typography variant="subtitle1" style={{ color: '#39A0ED' }}>
            {item.studios.join(', ')}
          </Typography>
          <Typography variant="subtitle2">
            {item.type} • {item.nrEpisodes} Episodes
          </Typography>
          <Box mt={1} mb={1}>
            {item.genres.map((genre: string) => (
              <Chip
                key={genre}
                label={genre}
                size="small"
                style={{
                  marginRight: 4,
                  marginBottom: 4,
                  backgroundColor: '#39A0ED',
                }}
              />
            ))}
          </Box>
          <Typography variant="caption">Rating: {item.score}</Typography>
        </Box>
      </Popover>
      {selectedAnime && (
        <EditAnimeDialog
          openDialog={openDialog}
          selectedAnime={selectedAnime}
          setSelectedAnime={setSelectedAnime}
          handleCloseDialog={handleCloseDialog}
          handleSave={handleSave}
        />
      )}
      <CustomizedSnackbars
        open={snackbarOpen}
        type={snackbarType as AlertColor}
        message={snackbarMessage}
        handleClose={() => setSnackbarOpen(false)}
      />
    </div>
  )
}
