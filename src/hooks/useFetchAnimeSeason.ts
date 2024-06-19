import fetchAnimeSeasons from '../services/AnimeSeasonService'
import useAnimeSeasonStore from '../store/useAnimeSeasonStore'

interface UseFetchAnimeSeasonProps {
  setSnackbarType: (type: string) => void
  setSnackbarMessage: (message: string) => void
  setSnackbarOpen: (open: boolean) => void
}

const useFetchAnimeSeason = ({
  setSnackbarType,
  setSnackbarMessage,
  setSnackbarOpen,
}: UseFetchAnimeSeasonProps) => {
  const setAnimeSeason = useAnimeSeasonStore((state) => state.setAnimeSeason)

  const getAnimeSeaons = () => {
    fetchAnimeSeasons()
      .then((result: { data: string[]; status: number }) => {
        if (result.status === 200) {
          setAnimeSeason(result.data)
        }
      })
      .catch((error: { message: string }) => {
        setSnackbarMessage(error.message)
        setSnackbarType('error')
        setSnackbarOpen(true)
      })
  }
  return getAnimeSeaons
}

export default useFetchAnimeSeason
