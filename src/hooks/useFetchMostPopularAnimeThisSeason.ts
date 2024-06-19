import Anime from '../data/Anime'
import { fetchAnime } from '../services/AnimeService'
import useAnimeStore from '../store/useAnimeStore'
import getCurrentSeason from '../utils/getCurrentSeason'

interface UseFetchMostPopularAnimeThisSeasonProps {
  setSnackbarType: (type: string) => void
  setSnackbarMessage: (message: string) => void
  setSnackbarOpen: (open: boolean) => void
}

const useFetchMostPopularAnimeThisSeason = ({
  setSnackbarType,
  setSnackbarMessage,
  setSnackbarOpen,
}: UseFetchMostPopularAnimeThisSeasonProps) => {
  const setMostPopularAnimeThisSeasonList = useAnimeStore(
    (state) => state.setMostPopularAnimeThisSeasonList
  )
  const year = new Date().getFullYear()
  const season = getCurrentSeason()

  const fetchMostPopularAnimeThisSeason = () => {
    fetchAnime(
      0,
      'asc',
      '',
      season.toUpperCase(),
      year,
      [],
      [],
      [],
      [],
      null,
      'popularity'
    )
      .then((result: { data: Anime[]; status: number }) => {
        if (result.status === 204) {
          setSnackbarType('info')
          setSnackbarMessage('No anime found')
          setMostPopularAnimeThisSeasonList([])
        }
        setMostPopularAnimeThisSeasonList(result.data)
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
  return fetchMostPopularAnimeThisSeason
}

export default useFetchMostPopularAnimeThisSeason
