import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  AlertColor,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
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
import AddIcon from '@mui/icons-material/Add'
import TagIcon from '@mui/icons-material/Tag'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import ExpandLinkButton from '../components/ExpandLinkButton'
import useFetchAnimeById from '../hooks/useFetchAnimeById'
import Anime from '../data/Anime'
import useUserStore from '../store/useUserStore'
import useDeleteAnime from '../hooks/useDeleteAnime'
import StyledButton from '../components/StyledButton'
import CustomizedSnackbars from '../components/CustomizedSnackBars'
import AnimeGridPreview from '../components/AnimeGridPreview'
import useAnimeStore from '../store/useAnimeStore'
import useFetchRecommendedAnime from '../hooks/useFetchRecommendations'
import AnimeUser from '../data/AnimeUser'
import useFetchAnimeUserById from '../hooks/useFetchAnimeUserById'
import useEditAnimeUser from '../hooks/useEditAnimeUser'
import EditAnimeDialog from '../components/EditAnimeDialog'
import useAddAnimeUser from '../hooks/useAddAnimeUser'

export default function ViewAnime(): JSX.Element {
  const [anime, setAnime] = useState<Anime>()
  const [animeUser, setAnimeUser] = useState<AnimeUser>()
  const user = useUserStore((state) => state.currentUser)!
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarType, setSnackbarType] = useState('')
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [selectedAnime, setSelectedAnime] = useState<AnimeUser | null>(null)
  const recommedAnimeList = useAnimeStore((state) => state.recommendedAnimeList)
  const [openDialog, setOpenDialog] = useState(false)

  const { id } = useParams<{ id: string }>() as unknown as { id: string }

  const fetchAnimeById = useFetchAnimeById({
    id,
    setAnime,
  })

  const fetchAnimeUserById = useFetchAnimeUserById({
    setAnime: setAnimeUser,
  })

  const getRecommendedAnime = useFetchRecommendedAnime({
    anime: anime!,
    setSnackbarOpen,
    setSnackbarType,
    setSnackbarMessage,
  })

  useEffect(() => {
    fetchAnimeById()
    fetchAnimeUserById(Number(id))
    getRecommendedAnime()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const [anchorTagsEl, setAnchorTagsEl] = useState(null)

  const [anchorStudiosEl, setAnchorStudioEl] = useState(null)

  const handlePopoverStudiosOpen = (event: any) => {
    setAnchorStudioEl(event.currentTarget)
  }

  const handlePopoverStudiosClose = () => {
    setAnchorStudioEl(null)
  }

  const [anchorGenresEl, setAnchorGenresEl] = useState(null)

  const handlePopoverGenresOpen = (event: any) => {
    setAnchorGenresEl(event.currentTarget)
  }

  const handlePopoverGenresClose = () => {
    setAnchorGenresEl(null)
  }

  const handleTagsClick = (event: any) => {
    setAnchorTagsEl(event.currentTarget)
  }

  const handleTagsClose = () => {
    setAnchorTagsEl(null)
  }

  const data = [
    { name: 'Watching', value: anime?.watching || 0 },
    { name: 'Dropped', value: anime?.dropped || 0 },
    { name: 'On Hold', value: anime?.onHold || 0 },
    { name: 'Completed', value: anime?.completed || 0 },
  ]

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

  const removeAnime = useDeleteAnime({
    setSnackbarOpen,
    setSnackbarType,
    setSnackbarMessage,
  })

  const handleAddClick = (a: Anime) => {
    fetchAnimeUserById(a.id)
    setSelectedAnime(animeUser!)
    setOpenDialog(true)
  }

  const handleAdd = () => {
    console.log('Add anime to user list')
    handleAddClick(anime!)
  }

  const handleRemoveClick = () => {
    console.log('Remove anime from user list')
    removeAnime(anime!)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedAnime(null)
  }

  const handleSave = () => {
    // Logic to save the anime user
    console.log('Save changes for:', selectedAnime)
    if (selectedAnime?.id === -1) {
      console.log('Add anime to user list')
      addAnimeUser()
    } else {
      console.log('Update anime in user list')
      updateAnimeUser()
    }
    setOpenDialog(false)
  }

  return (
    <Box sx={{ margin: 3 }}>
      <Typography variant="h4" component="div" align="center" gutterBottom>
        {anime?.title}
      </Typography>
      <Card
        sx={{
          display: 'flex',
          backgroundColor: '#0B3954',
          color: '#39A0ED',
          borderRadius: 10,
          margin: 3,
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: 1000, objectFit: 'cover' }}
          image={anime?.pictureURL} // replace with the path to your image
          alt={anime?.title}
        />
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Box
            sx={{
              display: 'flex',
              alignContent: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'column',
                padding: 2,
              }}
            >
              <Typography variant="h3" component="div" sx={{ padding: 1 }}>
                <Icon component={TagIcon} /> {anime?.popularity}
              </Typography>
              <Typography variant="h5" component="div" sx={{ padding: 1 }}>
                Score: {anime?.score}
              </Typography>
            </Box>
            <Grid item xs={15} sm={2}>
              <StyledButton
                onMouseOver={handlePopoverStudiosOpen}
                onMouseOut={handlePopoverStudiosClose}
              >
                Studios
              </StyledButton>
              <Popover
                id="mouse-over-popover"
                sx={{
                  pointerEvents: 'none',
                  backgroundColor: 'transparent',
                  '.MuiPaper-root': {
                    backgroundColor: '#0B3954',
                    borderRadius: '10px',
                    border: '1px solid #1a1a1a',
                    boxShadow: '0px 0px 10px 0px #1a1a1a',
                  },
                }}
                open={Boolean(anchorStudiosEl)}
                anchorEl={anchorStudiosEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                onClose={handlePopoverStudiosClose}
                disableRestoreFocus
              >
                <List
                  sx={{
                    display: 'flex',
                    color: '#39A0ED',
                    borderColor: '#39A0ED',
                    borderStyle: 'solid',
                    borderRadius: '16px',
                  }}
                >
                  {anime?.studios.map((studio, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <ListItem key={index}>
                      <ListItemText primary={studio} />
                    </ListItem>
                  ))}
                </List>
              </Popover>
              <StyledButton
                onMouseOver={handlePopoverGenresOpen}
                onMouseOut={handlePopoverGenresClose}
              >
                Genres
              </StyledButton>
              <Popover
                id="mouse-over-popover"
                sx={{
                  pointerEvents: 'none',
                  backgroundColor: 'transparent',
                  '.MuiPaper-root': {
                    backgroundColor: '#0B3954',
                    borderRadius: '10px',
                    border: '1px solid #1a1a1a',
                    boxShadow: '0px 0px 10px 0px #1a1a1a',
                  },
                }}
                open={Boolean(anchorGenresEl)}
                anchorEl={anchorGenresEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                onClose={handlePopoverStudiosClose}
                disableRestoreFocus
              >
                <List
                  sx={{
                    display: 'flex',
                    color: '#39A0ED',
                    borderColor: '#39A0ED',
                    borderStyle: 'solid',
                    borderRadius: '16px',
                  }}
                >
                  {anime?.genres.map((genre, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <ListItem key={index}>
                      <ListItemText primary={genre} />
                    </ListItem>
                  ))}
                </List>
              </Popover>
              <StyledButton variant="contained" onClick={handleTagsClick}>
                Tags
              </StyledButton>
              <Menu
                anchorEl={anchorTagsEl}
                open={Boolean(anchorTagsEl)}
                onClose={handleTagsClose}
                sx={{
                  '& .MuiPaper-root': {
                    backgroundColor: '#0B3954', // Background color of the menu
                    color: '#39A0ED', // Text color of the menu
                  },
                }}
              >
                {anime?.tags.map((tag, index) => (
                  <MenuItem
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    onClick={handleTagsClose}
                    sx={{
                      backgroundColor: '#0B3954', // Background color of the item
                      color: '#39A0ED', // Text color of the item
                      '&:hover': {
                        backgroundColor: '#39A0ED', // Background color on hover
                        color: '#0B3954', // Text color on hover
                      },
                    }}
                  >
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
                    boxShadow: '0px 0px 10px 0px #1a1a1a',
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
                  <StyledButton onClick={() => setPopoverOpen(false)}>
                    No
                  </StyledButton>
                </Box>
              </Popover>
            </Grid>
          </Box>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            sx={{
              padding: { xs: '5px 0', sm: '10px 0' }, // Responsive padding
              margin: { xs: '5px 5px', sm: '10px 10px' }, // Responsive margin
              wordWrap: 'break-word', // Ensure text wraps
              whiteSpace: 'pre-wrap', // Preserve whitespace and ensure wrapping
              overflowWrap: 'break-word', // Handle long words or URLs
              maxWidth: '30%', // Ensure it fits within the container
              lineHeight: 1, // Adjust line height for less spacing between lines
            }}
          >
            {anime?.synopsis}
          </Typography>
          {user && (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <StyledButton
                onClick={handleAdd}
                variant="outlined"
                sx={{ marginRight: 2 }}
              >
                <AddIcon style={{ marginRight: '8px' }} />
                Add to List
              </StyledButton>
              {(user.role === 'ROLE_ADMIN' || user.role === 'ROLE_MANAGER') && (
                <>
                  <ExpandLinkButton to={`/anime/edit/${id}`}>
                    Edit
                  </ExpandLinkButton>
                  <IconButton
                    onClick={() => setPopoverOpen(true)}
                    sx={{ marginRight: 2 }}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </>
              )}
            </Box>
          )}
        </CardContent>
      </Card>
      <Grid container spacing={2} sx={{ mt: 2, margin: 3 }}>
        <Grid item xs={2} sm={2}>
          <Chip
            label={`Type: ${anime?.type}`}
            sx={{
              backgroundColor: '#39A0ED',
              color: '#1a1a1a',
              fontWeight: 'bold',
              borderRadius: '16px',
              padding: '10% 0',
              fontSize: '1.1rem', // Increase font size
            }}
            size="medium"
          />
        </Grid>
        <Grid item xs={2} sm={2}>
          <Chip
            label={`Season: ${anime?.animeSeason.season} ${anime?.animeSeason.year}`}
            sx={{
              backgroundColor: '#39A0ED',
              color: '#1a1a1a',
              fontWeight: 'bold',
              borderRadius: '16px',
              padding: '10% 0',
              fontSize: '1.1rem', // Increase font size
            }}
            size="medium"
          />
        </Grid>
        <Grid item xs={2} sm={2}>
          <Chip
            label={`Episodes: ${anime?.nrEpisodes}`}
            sx={{
              backgroundColor: '#39A0ED',
              color: '#1a1a1a',
              fontWeight: 'bold',
              borderRadius: '16px',
              padding: '10% 0',
              fontSize: '1.1rem', // Increase font size
            }}
            size="medium"
          />
        </Grid>
        <Grid item xs={2} sm={2}>
          <Chip
            label={`Status: ${anime?.status}`}
            sx={{
              backgroundColor: '#39A0ED',
              color: '#1a1a1a',
              fontWeight: 'bold',
              borderRadius: '16px',
              padding: '10% 0',
              fontSize: '1.1rem', // Increase font size
            }}
            size="medium"
          />
        </Grid>
        <Grid item xs={2} sm={2}>
          <Chip
            label={`Start Date: ${anime?.startDate}`}
            sx={{
              backgroundColor: '#39A0ED',
              color: '#1a1a1a',
              fontWeight: 'bold',
              borderRadius: '16px',
              padding: '10% 0',
              fontSize: '1.1rem', // Increase font size
            }}
            size="medium"
          />
        </Grid>
        <Grid item xs={2} sm={2}>
          <Chip
            label={`End Date: ${anime?.endDate}`}
            sx={{
              backgroundColor: '#39A0ED',
              color: '#1a1a1a',
              fontWeight: 'bold',
              borderRadius: '16px',
              padding: '10% 0',
              fontSize: '1.1rem', // Increase font size
            }}
            size="medium"
          />
        </Grid>
      </Grid>
      <br />
      <Box sx={{ height: 400, backgroundColor: '#0B3954', borderRadius: 10 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Legend formatter={() => 'Number of Users'} />
            <Bar dataKey="value" fill="#39A0ED" name="Number of Users" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
      <CustomizedSnackbars
        open={snackbarOpen}
        type={snackbarType as AlertColor}
        message={snackbarMessage}
        handleClose={() => setSnackbarOpen(false)}
      />
      <Box sx={{ mt: 2, padding: 3 }}>
        <Typography
          variant="h4"
          component="div"
          align="center"
          color="#39A0ED"
          gutterBottom
          sx={{ padding: 2 }}
        >
          Recommended Anime
        </Typography>
        <AnimeGridPreview animeList={recommedAnimeList} />
      </Box>
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
  )
}
