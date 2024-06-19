import Anime from '../data/Anime'
import { fetchAnime } from '../services/AnimeService'
import useAnimeStore from '../store/useAnimeStore'

interface UseFetchTop100AnimeProps {
  setSnackbarType: (type: string) => void
  setSnackbarMessage: (message: string) => void
  setSnackbarOpen: (open: boolean) => void
}

const useFetchTop100Anime = ({
  setSnackbarType,
  setSnackbarMessage,
  setSnackbarOpen,
}: UseFetchTop100AnimeProps) => {
  const setTop100AnimeStore = useAnimeStore((state) => state.setTop100AnimeList)
  const fetchTop100AnimeFun = () => {
    fetchAnime()
      .then((result: { data: Anime[]; status: number }) => {
        if (result.status === 204) {
          setSnackbarType('info')
          setSnackbarMessage('No anime found')
          setTop100AnimeStore([])
        }
        setTop100AnimeStore(result.data)
      })
      .catch((error: { message: string }) => {
        if (error.message === 'Network Error') {
          setSnackbarType('error')
          setSnackbarMessage('Failed to fetch anime, server is down')
        } else {
          setSnackbarType('warning')
          setSnackbarMessage('Unknown error')
        }
      })
      .finally(() => {
        setSnackbarOpen(true)
      })
  }
  return fetchTop100AnimeFun
}

export default useFetchTop100Anime
