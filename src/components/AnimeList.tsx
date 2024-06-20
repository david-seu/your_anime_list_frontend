/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Typography,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  AlertColor,
  IconButton,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { Star, Edit, Close } from '@mui/icons-material'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useEffect, useState } from 'react'
import CustomizedSnackbars from './CustomizedSnackBars'
import useAnimeUserStore from '../store/useAnimeUserStore'
import useFetchAnimeUser from '../hooks/useFetchAnimeUser'
import useFetchMoreAnimeUser from '../hooks/useFetchMoreAnimeUser'
import AnimeUser from '../data/AnimeUser'
import EditAnimeDialog from './EditAnimeDialog'
import useEditAnimeUser from '../hooks/useEditAnimeUser'
import useDeleteAnimeUser from '../hooks/useDeleteAnimeUser'
import ListLoader from './ListLoader'

export default function AnimeList() {
  const animeList = useAnimeUserStore((state) => state.animeList)
  const hasMore = useAnimeUserStore((state) => state.hasMore)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarType, setSnackbarType] = useState('')
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedAnime, setSelectedAnime] = useState<AnimeUser | null>()
  const setPageStoreAnime = useAnimeUserStore((state) => state.setPage)
  const setHasMoreStore = useAnimeUserStore((state) => state.setHasMore)
  const setAnimeListStore = useAnimeUserStore((state) => state.setAnimeList)
  const title = useAnimeUserStore((state) => state.title)
  const sortDirection = useAnimeUserStore((state) => state.sortDirection)
  const season = useAnimeUserStore((state) => state.season)
  const year = useAnimeUserStore((state) => state.year)
  const genres = useAnimeUserStore((state) => state.genres)
  const tags = useAnimeUserStore((state) => state.tags)
  const studios = useAnimeUserStore((state) => state.studios)
  const type = useAnimeUserStore((state) => state.type)
  const status = useAnimeUserStore((state) => state.status)
  const orderBy = useAnimeUserStore((state) => state.orderBy)

  const fetchAnime = useFetchAnimeUser({
    setSnackbarType,
    setSnackbarMessage,
    setSnackbarOpen,
  })

  useEffect(() => {
    setAnimeListStore([])
    setPageStoreAnime(0)
    setHasMoreStore(true)
    fetchAnime()
  }, [])

  // useEffect(() => {
  //   setAnimeListStore([])
  //   setPageStoreAnime(0)
  //   setHasMoreStore(true)
  //   fetchAnime()
  // }, [
  //   title,
  //   sortDirection,
  //   season,
  //   year,
  //   genres,
  //   tags,
  //   studios,
  //   type,
  //   status,
  //   orderBy,
  // ])

  const fetchMoreData = useFetchMoreAnimeUser({
    setSnackbarType,
    setSnackbarMessage,
    setSnackbarOpen,
  })

  const handleEditClick = (anime: AnimeUser) => {
    setSelectedAnime(anime)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedAnime(null)
  }

  const updateAnimeUser = useEditAnimeUser({
    animeUser: selectedAnime!,
    setSnackbarOpen,
    setSnackbarType,
    setSnackbarMessage,
  })

  const handleSave = () => {
    console.log('Save changes for:', selectedAnime)
    updateAnimeUser()
    setOpenDialog(false)
  }

  const deleteAnimeUser = useDeleteAnimeUser({
    setSnackbarOpen,
    setSnackbarType,
    setSnackbarMessage,
  })

  const handleDeleteClick = (anime: AnimeUser) => {
    console.log('Delete anime:', anime)
    deleteAnimeUser(anime)
  }

  return (
    <div>
      <InfiniteScroll
        dataLength={animeList.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<ListLoader />}
        style={{ backgroundColor: 'transparent' }}
      >
        <Box sx={{ width: '100%' }}>
          <List>
            {animeList.map((item, index) => (
              <ListItem
                // eslint-disable-next-line react/no-array-index-key
                key={index + 1}
                alignItems="flex-start"
                sx={{
                  position: 'relative',
                  '&:hover': {
                    backgroundColor: '#0B3954', // Change to desired hover color
                    '.edit-icon': { display: 'block' },
                    '.delete-icon': { display: 'block' },
                    '.hover-image': { display: 'block' },
                  },
                }}
              >
                <Box
                  className="hover-image"
                  sx={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: 100,
                    height: 150,
                    display: 'none',
                    zIndex: 10,
                  }}
                >
                  <Link to={`/anime/${item.anime?.id}`}>
                    <img
                      src={item.anime?.pictureURL}
                      alt={item.anime?.title}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </Link>
                </Box>
                <ListItemAvatar>
                  <Link to={`/anime/${item.anime?.id}`}>
                    <Avatar
                      variant="square"
                      src={item.anime?.pictureURL}
                      alt={item.anime?.title}
                      sx={{ width: 60, height: 100, margin: 2 }}
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
                      {item.anime?.title}
                      {item.isFavorite && (
                        <Star
                          sx={{
                            color: 'gold',
                            marginLeft: 1,
                            verticalAlign: 'middle',
                          }}
                        />
                      )}
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
                        {item.anime?.genres.map(
                          (genre: string, idx: number) => (
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
                          )
                        )}
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography variant="body2" color="textSecondary">
                          {item.anime?.type} • {item.anime?.nrEpisodes} episodes
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {item.status}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                          {item.score}
                        </Typography>
                      </Box>
                    </>
                  }
                />
                <IconButton
                  className="edit-icon"
                  onClick={() => handleEditClick(item)}
                  sx={{
                    position: 'absolute',
                    right: 30,
                    top: 0,
                    display: 'none',
                  }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  className="delete-icon"
                  onClick={() => handleDeleteClick(item)}
                  sx={{
                    position: 'absolute',
                    right: 5,
                    top: 0,
                    display: 'none',
                  }}
                >
                  <Close />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </InfiniteScroll>

      {selectedAnime && (
        <EditAnimeDialog
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
          selectedAnime={selectedAnime}
          setSelectedAnime={setSelectedAnime}
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
