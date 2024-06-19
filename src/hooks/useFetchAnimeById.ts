import { useAnimeStore } from '../store/useAnimeStore'
import { getAnime } from '../services/AnimeService'
import Anime from '../data/Anime'

interface UseFetchAnimeByIdProps {
  id: string
  setAnime: (anime: Anime) => void
}

const useFetchAnimeById = ({ id, setAnime }: UseFetchAnimeByIdProps) => {
  const getAnimeStore = useAnimeStore((state) => state.getAnime)

  const getAnimeById = () => {
    if (id) {
      const anime = getAnimeStore(Number(id))

      getAnime(Number(id))
        .then((result: { data: Anime }) => {
          setAnime(result.data)
        })
        .catch(() => {
          if (anime) {
            setAnime(anime)
          }
        })
    }
  }

  return getAnimeById
}

export default useFetchAnimeById
