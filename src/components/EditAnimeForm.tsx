import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  AlertColor,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Anime from '../data/Anime'
import useFetchAnimeById from '../hooks/useFetchAnimeById'
import useGenreStore from '../store/useGenreStore'
import useFetchGenre from '../hooks/useFetchGenre'
import useTagStore from '../store/useTagsStore'
import useFetchTags from '../hooks/useFetchTags'
import useFetchStudios from '../hooks/useFetchStudios'
import Studio from '../data/Studio'
import CustomizedSnackbars from './CustomizedSnackBars'
import useStudioStore from '../store/useStudioStore'
import useEditAnime from '../hooks/useEditAnime'

interface AnimeEditFormProps {
  initialAnimeId: number
}

export default function EditAnimeForm({ initialAnimeId }: AnimeEditFormProps) {
  const [anime, setAnime] = useState<Anime | null>()
  const genres = useGenreStore((state) => state.genre)
  const studios = useStudioStore((state) => state.studio)
  const navigate = useNavigate()

  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarType, setSnackbarType] = useState('')
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const fetchGenre = useFetchGenre({
    setSnackbarType,
    setSnackbarMessage,
    setSnackbarOpen,
  })

  const fetchTags = useFetchTags({
    setSnackbarType,
    setSnackbarMessage,
    setSnackbarOpen,
  })

  const fetchStudios = useFetchStudios({
    setSnackbarType,
    setSnackbarMessage,
    setSnackbarOpen,
  })

  const id = initialAnimeId.toString()

  const fetchAnimeById = useFetchAnimeById({
    id,
    setAnime,
  })

  useEffect(() => {
    fetchAnimeById()
    fetchGenre()
    fetchTags()
    fetchStudios()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const tags = useTagStore((state) => state.tags)

  const years = Array.from({ length: 80 }, (_, i) => 2024 - i)
  const seasons = ['Winter', 'Spring', 'Summer', 'Fall'].flatMap((season) =>
    years.map((year) => ({ season, year }))
  )

  const handleChange = (event: any) => {
    const { name, value } = event.target
    if (anime) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      ; ({ ...anime, [name!]: value })
    }
  }

  const handleGenreChange = (event: any) => {
    const value = event.target.value as string[]
    if (anime) {
      setAnime({ ...anime, genres: value })
    }
  }

  const handleStudioChange = (event: any) => {
    const value = event.target.value as string[]
    if (anime) {
      setAnime({ ...anime, studios: value })
    }
  }

  const handleTagChange = (event: any) => {
    const value = event.target.value as string[]
    if (anime) {
      setAnime({ ...anime, tags: value })
    }
  }

  const handleSeasonChange = (event: any) => {
    const value = event.target.value as string
    const [season, year] = value.split(' ')
    if (anime) {
      setAnime({ ...anime, animeSeason: { season, year: Number(year) } })
    }
  }

  const updateAnime = useEditAnime({
    anime: anime!,
    setSnackbarOpen,
    setSnackbarType,
    setSnackbarMessage,
  })

  const handleSubmit = () => {
    if (anime) {
      // Dummy save function, replace with actual onSave
      console.log('Saved Anime:', anime)
      updateAnime()
    }
  }

  const handleCancel = () => {
    // Dummy cancel function, replace with actual onCancel
    console.log('Cancel Edit')
    navigate(`/anime/${initialAnimeId}`)
  }

  return (
    <div>
      <Box
        component="form"
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          name="title"
          label="Title"
          value={anime?.title || ''}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="synopsis"
          label="Synopsis"
          value={anime?.synopsis || ''}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
        />
        <TextField
          name="nrEpisodes"
          label="Number of Episodes"
          type="number"
          value={anime?.nrEpisodes || ''}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="pictureURL"
          label="Picture URL"
          value={anime?.pictureURL || ''}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="thumbnailURL"
          label="Thumbnail URL"
          value={anime?.thumbnailURL || ''}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="startDate"
          label="Start Date"
          type="date"
          value={anime?.startDate || ''}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          name="endDate"
          label="End Date"
          type="date"
          value={anime?.endDate || ''}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select name="type" value={anime?.type || ''} onChange={handleChange}>
            {['TV', 'Movie', 'OVA', 'ONA', 'Special'].map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={anime?.status || ''}
            onChange={handleChange}
          >
            {['FINISHED', 'ONGOING', 'UPCOMING', 'UNKNOWN'].map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Genres</InputLabel>
          <Select
            multiple
            value={anime?.genres || []}
            onChange={handleGenreChange}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {(selected as string[]).map((genre) => (
                  <Chip key={genre} label={genre} />
                ))}
              </Box>
            )}
          >
            {genres.map((genre) => (
              <MenuItem key={genre.name} value={genre.name}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Studios</InputLabel>
          <Select
            multiple
            value={anime?.studios || []}
            onChange={handleStudioChange}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {(selected as string[]).map((studio) => (
                  <Chip key={studio} label={studio} />
                ))}
              </Box>
            )}
          >
            {studios.map((studio: Studio) => (
              <MenuItem key={studio.id} value={studio.name}>
                {studio.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Tags</InputLabel>
          <Select
            multiple
            value={anime?.tags || []}
            onChange={handleTagChange}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {(selected as string[]).map((tag) => (
                  <Chip key={tag} label={tag} />
                ))}
              </Box>
            )}
          >
            {tags.map((tag) => (
              <MenuItem key={tag.id} value={tag.name}>
                {tag.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Season</InputLabel>
          <Select
            name="animeSeason"
            value={`${anime?.animeSeason.season || ''} ${anime?.animeSeason.year || ''}`}
            onChange={handleSeasonChange}
          >
            {seasons.map((season) => (
              <MenuItem
                key={`${season.season} ${season.year}`}
                value={`${season.season} ${season.year}`}
              >
                {season.season} {season.year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </Box>
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
