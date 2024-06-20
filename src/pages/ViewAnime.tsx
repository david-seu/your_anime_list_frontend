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
import FavoriteIcon from '@mui/icons-material/Favorite'
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

export default function ViewAnime(): JSX.Element {
  const [anime, setAnime] = useState<Anime>()
  const [animeUser, setAnimeUser] = useState<AnimeUser>()
  const user = useUserStore((state) => state.currentUser)!
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarType, setSnackbarType] = useState('')
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [popoverOpen, setPopoverOpen] = useState(false)
  const recommedAnimeList = useAnimeStore((state) => state.recommendedAnimeList)

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

  const data = [
    { name: 'Watching', value: anime?.watching || 0 },
    { name: 'Dropped', value: anime?.dropped || 0 },
    { name: 'On Hold', value: anime?.onHold || 0 },
    { name: 'Completed', value: anime?.completed || 0 },
  ]

  const updateAnimeUser = useEditAnimeUser({
    animeUser: animeUser!,
    setSnackbarOpen,
    setSnackbarType,
    setSnackbarMessage,
  })

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
          backgroundColor: '#0B3954',
          color: '#39A0ED',
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
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <StyledButton
                onClick={handleAdd}
                variant="outlined"
                sx={{ marginRight: 2 }}
              >
                <AddIcon style={{ marginRight: '8px' }} />
                Add to List
              </StyledButton>
              <StyledButton onClick={handleFavorite} sx={{ marginRight: 2 }}>
                <FavoriteIcon style={{ marginRight: '8px' }} />
                Favorite
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
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={15} sm={2}>
          <Chip
            label={`Type: ${anime?.type}`}
            sx={{
              backgroundColor: '#39A0ED',
              color: '#1a1a1a',
              fontWeight: 'bold',
              borderRadius: '16px',
            }}
          />
        </Grid>
        <Grid item xs={15} sm={2}>
          <Chip
            label={`Episodes: ${anime?.nrEpisodes}`}
            sx={{
              backgroundColor: '#39A0ED',
              color: '#1a1a1a',
              fontWeight: 'bold',
              borderRadius: '16px',
            }}
          />
        </Grid>
        <Grid item xs={15} sm={2}>
          <Chip
            label={`Status: ${anime?.status}`}
            sx={{
              backgroundColor: '#39A0ED',
              color: '#1a1a1a',
              fontWeight: 'bold',
              borderRadius: '16px',
            }}
          />
        </Grid>
        <Grid item xs={15} sm={2}>
          <Chip
            label={`Start Date: ${anime?.startDate}`}
            sx={{
              backgroundColor: '#39A0ED',
              color: '#1a1a1a',
              fontWeight: 'bold',
              borderRadius: '16px',
            }}
          />
        </Grid>
        <Grid item xs={15} sm={2}>
          <Chip
            label={`End Date: ${anime?.endDate}`}
            sx={{
              backgroundColor: '#39A0ED',
              color: '#1a1a1a',
              fontWeight: 'bold',
              borderRadius: '16px',
            }}
          />
        </Grid>
      </Grid>
      <br />
      <Box sx={{ width: '100%', height: 300 }}>
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
      <Grid item xs={15} sm={2}>
        <StyledButton onClick={handleStatsClick}>Show Stats</StyledButton>
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
        <StyledButton variant="contained" onClick={handleTagsClick}>
          Show Tags
        </StyledButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
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
      <CustomizedSnackbars
        open={snackbarOpen}
        type={snackbarType as AlertColor}
        message={snackbarMessage}
        handleClose={() => setSnackbarOpen(false)}
      />
      <Box sx={{ mt: 2 }}>
        <Typography
          variant="h5"
          component="div"
          align="center"
          color="#39A0ED"
          gutterBottom
        >
          Recommended Anime
        </Typography>
        <AnimeGridPreview animeList={recommedAnimeList} />
      </Box>
    </div>
  )
}
