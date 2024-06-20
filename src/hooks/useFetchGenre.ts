import Genre from '../data/Genre'
import fetchGenres from '../services/GenreService'
import useGenreStore from '../store/useGenreStore'

interface UseFetchGenreProps {
  setSnackbarType: (type: string) => void
  setSnackbarMessage: (message: string) => void
  setSnackbarOpen: (open: boolean) => void
}

const useFetchGenre = ({
  setSnackbarType,
  setSnackbarMessage,
  setSnackbarOpen,
}: UseFetchGenreProps) => {
  const setGenre = useGenreStore((state) => state.setGenre)

  const getGenre = () => {
    fetchGenres()
      .then((result: { data: Genre[]; status: number }) => {
        if (result.status === 200) {
          setGenre(result.data.sort((a, b) => a.name.localeCompare(b.name)))
        }
      })
      .catch((error: { message: string }) => {
        setSnackbarMessage(error.message)
        setSnackbarType('error')
        setSnackbarOpen(true)
      })
  }
  return getGenre
}

export default useFetchGenre
