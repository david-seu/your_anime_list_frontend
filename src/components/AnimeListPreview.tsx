/* eslint-disable react/no-array-index-key */
import {
  Box,
  Typography,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  AlertColor,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Add as AddIcon } from '@mui/icons-material' // Import AddIcon
import Anime from '../data/Anime'
import useUserStore from '../store/useUserStore'
import EditAnimeDialog from './EditAnimeDialog'
import AnimeUser from '../data/AnimeUser'
import useFetchAnimeUserById from '../hooks/useFetchAnimeUserById'
import useEditAnimeUser from '../hooks/useEditAnimeUser'
import useAddAnimeUser from '../hooks/useAddAnimeUser'
import CustomizedSnackbars from './CustomizedSnackBars'

interface AnimeListProps {
  animeList: Anime[]
}

export default function AnimeListPreview({ animeList }: AnimeListProps) {
  const user = useUserStore((state) => state.currentUser)

  const [openDialog, setOpenDialog] = useState(false)
  const [selectedAnime, setSelectedAnime] = useState<AnimeUser | null>(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarType, setSnackbarType] = useState('')
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const getAnimeUser = useFetchAnimeUserById({ setAnime: setSelectedAnime })

  const handleAddClick = (anime: Anime) => {
    getAnimeUser(anime.id)
    setOpenDialog(true)
  }

  useEffect(() => {
    console.log('animeList:', animeList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <List className="list">
          {animeList.map((item, index) => (
            <ListItem
              key={index + 1}
              alignItems="flex-start"
              sx={{
                position: 'relative',
                '&:hover': {
                  backgroundColor: '#0B3954', // Change to desired hover color
                  '.add-icon': { display: user ? 'block' : 'none' },
                },
              }}
            >
              <ListItemAvatar>
                <Link to={`/anime/${item.id}`}>
                  <Avatar
                    variant="square"
                    src={item.pictureURL}
                    alt={item.title}
                    sx={{ width: 60, height: 100 }}
                    style={{ margin: 20 }}
                  />
                </Link>
              </ListItemAvatar>
              <ListItemText
                style={{ color: '#39A0ED' }}
                primary={
                  <>
                    <Typography
                      variant="h5"
                      component="span"
                      sx={{
                        fontWeight: 'bold',
                        marginRight: 2,
                        color: '#39A0ED',
                      }}
                    >
                      #{index + 1}
                    </Typography>
                    {item.title}
                  </>
                }
                secondary={
                  <>
                    <Box
                      display="flex"
                      flexWrap="wrap"
                      alignItems="center"
                      mt={1}
                      mb={1}
                    >
                      {item.genres.map((genre: string, idx: number) => (
                        <Chip
                          key={idx}
                          label={genre}
                          variant="filled"
                          size="small"
                          sx={{
                            marginRight: 1,
                            backgroundColor: '#39A0ED',
                            color: 'black',
                          }}
                        />
                      ))}
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="body2" color="textSecondary">
                        {item.score} •{' '}
                        {item.watching +
                          item.dropped +
                          item.planToWatch +
                          item.completed +
                          item.onHold}{' '}
                        users
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {item.type} • {item.nrEpisodes} episodes
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {item.animeSeason.season} {item.animeSeason.year}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {item.status}
                      </Typography>
                    </Box>
                  </>
                }
              />
              {user && (
                <IconButton
                  className="add-icon"
                  onClick={() => handleAddClick(item)}
                  sx={{
                    position: 'absolute',
                    right: 30,
                    top: 0,
                    display: 'none',
                  }}
                >
                  <AddIcon />
                </IconButton>
              )}
            </ListItem>
          ))}
        </List>
        {selectedAnime && (
          <EditAnimeDialog
            openDialog={openDialog}
            selectedAnime={selectedAnime}
            setSelectedAnime={setSelectedAnime}
            handleCloseDialog={handleCloseDialog}
            handleSave={handleSave}
          />
        )}
      </Box>
      <CustomizedSnackbars
        open={snackbarOpen}
        type={snackbarType as AlertColor}
        message={snackbarMessage}
        handleClose={() => setSnackbarOpen(false)}
      />
    </div>
  )
}
