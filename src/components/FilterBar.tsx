/* eslint-disable react/no-array-index-key */
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  styled,
  AlertColor,
  Checkbox,
  ListItemText,
} from '@mui/material'
import { useEffect, useState } from 'react'
import '../App.css'
import useGenreStore from '../store/useGenreStore'
import useFetchGenre from '../hooks/useFetchGenre'
import CustomizedSnackbars from './CustomizedSnackBars'
import Genre from '../data/Genre'
import useAnimeStore from '../store/useAnimeStore'
import useFetchAnimeSeason from '../hooks/useFetchAnimeSeason'
import useAnimeSeasonStore from '../store/useAnimeSeasonStore'

const CssTextField = styled(TextField)({
  '& label': {
    color: '#0B3954', // Change the color here
  },
  '&:hover label': {
    color: '#39A0ED', // Change the color here
  },
  '&:hover .MuiInputBase-input': {
    color: '#39A0ED',
  },
  '& label.Mui-focused': {
    color: '#39A0ED',
  },

  '& .MuiInput-underline:after': {
    borderBottomColor: '#0B3954',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#0B3954',
    },
    '&:hover fieldset': {
      borderColor: '#39A0ED',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#39A0ED',
    },
  },
  '& .MuiInputBase-input': {
    color: '#0B3954', // Change the color here
  },
})

const CssFormControl = styled(FormControl)({
  '& label': {
    color: '#0B3954',
  },
  '&:hover label': {
    color: '#39A0ED',
  },
  '&:hover .MuiInputBase-input': {
    color: '#39A0ED',
  },
  '& label.Mui-focused': {
    color: '#39A0ED',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#0B3954',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#0B3954',
    },
    '&:hover fieldset': {
      borderColor: '#39A0ED',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#39A0ED',
    },
  },
  '& .MuiInputBase-input': {
    color: '#0B3954',
  },
  '& .MuiMenu-paper': {
    backgroundColor: 'green', // Change the background color of the opened Select
  },
})

const MenuProps = {
  PaperProps: {
    style: {
      backgroundColor: '#222', // Background color
      color: '#39A0ED', // Text color
    },
  },
}

export default function FilterBar() {
  const setGenres = useAnimeStore((state) => state.setGenres)
  const setTypes = useAnimeStore((state) => state.setType)
  const setSeason = useAnimeStore((state) => state.setSeason)
  const setTitle = useAnimeStore((state) => state.setTitle)
  const season = useAnimeStore((state) => state.season)
  const search = useAnimeStore((state) => state.title)
  const genres = useGenreStore((state) => state.genre)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarType, setSnackbarType] = useState('')
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const years = useAnimeSeasonStore((state) => state.animeSeason)
  const setYear = useAnimeStore((state) => state.setYear)
  const year = useAnimeStore((state) => state.year)
  const genresChoice = useAnimeStore((state) => state.genres)
  const typesChoice = useAnimeStore((state) => state.type)

  const seasons = ['SPRING', 'SUMMER', 'FALL', 'WINTER']
  const types = ['TV', 'Movie', 'OVA', 'ONA']

  const fetchGenre = useFetchGenre({
    setSnackbarType,
    setSnackbarMessage,
    setSnackbarOpen,
  })

  const fetchAnimeSeason = useFetchAnimeSeason({
    setSnackbarType,
    setSnackbarMessage,
    setSnackbarOpen,
  })

  useEffect(() => {
    fetchGenre()
    fetchAnimeSeason()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleGenreChange = (event: any) => {
    setGenres(event.target.value)
  }

  const handleYearChange = (event: any) => {
    setYear(event.target.value)
  }

  const handleSeasonChange = (event: any) => {
    setSeason(event.target.value)
  }

  const handleTypeChange = (event: any) => {
    setTypes(event.target.value)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <CssTextField
          label="Search"
          id="custom-css-outlined-input"
          onChange={handleSearchChange}
          value={search}
          style={{ paddingRight: '10px' }}
        />
        <CssFormControl
          variant="outlined"
          size="small"
          style={{ minWidth: 120, marginRight: '10px' }}
        >
          <InputLabel>Genres</InputLabel>
          <Select
            multiple
            value={genresChoice}
            onChange={handleGenreChange}
            label="Genres"
            MenuProps={MenuProps}
            renderValue={(selected) =>
              Array.isArray(selected) ? selected.join(', ') : selected
            }
          >
            {genres.map((g: Genre, index: number) => (
              <MenuItem key={index} value={g.name.toLowerCase()}>
                <Checkbox
                  checked={genresChoice.indexOf(g.name.toLowerCase()) > -1}
                />
                <ListItemText primary={g.name} />{' '}
              </MenuItem>
            ))}
          </Select>
        </CssFormControl>
        <CssFormControl
          variant="outlined"
          size="small"
          style={{ minWidth: 120, marginRight: '10px' }}
        >
          <InputLabel>Year</InputLabel>
          <Select
            value={year}
            onChange={handleYearChange}
            label="Year"
            MenuProps={MenuProps}
          >
            {years.map((y, index) => (
              <MenuItem key={index} value={y}>
                {y}
              </MenuItem>
            ))}
          </Select>
        </CssFormControl>
        <CssFormControl
          variant="outlined"
          size="small"
          style={{ minWidth: 120, marginRight: '10px' }}
        >
          <InputLabel>Season</InputLabel>
          <Select
            value={season}
            onChange={handleSeasonChange}
            label="Season"
            MenuProps={MenuProps}
          >
            {seasons.map((s, index) => (
              <MenuItem key={index} value={s.toLowerCase()}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </CssFormControl>
        <CssFormControl
          variant="outlined"
          size="small"
          style={{ minWidth: 120 }}
        >
          <InputLabel>Type</InputLabel>
          <Select
            multiple
            value={typesChoice}
            onChange={handleTypeChange}
            label="Type"
            MenuProps={MenuProps}
            renderValue={(selected) =>
              Array.isArray(selected) ? selected.join(', ') : selected
            }
          >
            {types.map((t, index) => (
              <MenuItem key={index} value={t.toLowerCase()}>
                <Checkbox checked={typesChoice.indexOf(t.toLowerCase()) > -1} />
                <ListItemText primary={t} />{' '}
              </MenuItem>
            ))}
          </Select>
        </CssFormControl>
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
