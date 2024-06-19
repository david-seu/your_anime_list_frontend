import Anime from '../data/Anime'
import { fetchAnime } from '../services/AnimeService'
import useAnimeStore from '../store/useAnimeStore'

interface UseFetchMostPopularAnimeProps {
  setSnackbarType: (type: string) => void
  setSnackbarMessage: (message: string) => void
  setSnackbarOpen: (open: boolean) => void
}

const useFetchMostPopularAnime = ({
  setSnackbarType,
  setSnackbarMessage,
  setSnackbarOpen,
}: UseFetchMostPopularAnimeProps) => {
  const setMostPopularAnimeList = useAnimeStore(
    (state) => state.setMostPopularAnimeList
  )

  const fetchMostPopularAnime = () => {
    fetchAnime(0, 'asc', '', null, null, [], [], [], [], null, 'popularity')
      .then((result: { data: Anime[]; status: number }) => {
        if (result.status === 204) {
          setSnackbarType('info')
          setSnackbarMessage('No anime found')
          setMostPopularAnimeList([])
        }
        setMostPopularAnimeList(result.data)
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
  return fetchMostPopularAnime
}

export default useFetchMostPopularAnime
