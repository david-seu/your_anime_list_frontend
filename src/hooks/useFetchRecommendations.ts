import Anime from '../data/Anime'
import { getRecommendations } from '../services/AnimeService'
import useAnimeStore from '../store/useAnimeStore'

interface UseFetchRecommendedAnimeProp {
  anime: Anime
  setSnackbarType: (type: string) => void
  setSnackbarMessage: (message: string) => void
  setSnackbarOpen: (open: boolean) => void
}

const useFetchRecommendedAnime = ({
  anime,
  setSnackbarType,
  setSnackbarMessage,
  setSnackbarOpen,
}: UseFetchRecommendedAnimeProp) => {
  const setRecommendedAnime = useAnimeStore(
    (state) => state.setRecommendedAnimeList
  )

  const getRecommendedAnime = () => {
    getRecommendations(anime?.title)
      .then((result: { data: Anime[]; status: number }) => {
        if (result.status === 200) {
          console.log('Recommended Anime:', result.data)
          setRecommendedAnime(result.data)
        }
      })
      .catch((error: { message: string }) => {
        setSnackbarMessage(error.message)
        setSnackbarType('error')
        setSnackbarOpen(true)
      })
  }
  return getRecommendedAnime
}

export default useFetchRecommendedAnime
