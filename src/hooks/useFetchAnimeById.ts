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
    if (id !== 'new') {
      const anime = getAnimeStore(Number(id))

      getAnime(Number(id))
        .then((result: { data: Anime }) => {
          setAnime(result.data)
          console.log('Anime fetched:', result.data)
        })
        .catch(() => {
          if (anime) {
            setAnime(anime)
          }
        })
    } else {
      setAnime({
        id: -1,
        title: '',
        score: 0,
        synopsis: '',
        pictureURL: '',
        thumbnailURL: '',
        startDate: '',
        endDate: '',
        type: '',
        nrEpisodes: 0,
        status: '',
        animeSeason: {
          season: '',
          year: 0,
        },
        popularity: 0,
        completed: 0,
        watching: 0,
        onHold: 0,
        dropped: 0,
        planToWatch: 0,
        malId: 0,
        user: null,
        relatedAnime: [],
        recommendations: [],
        checked: false,
        synonyms: [],
        genres: [],
        studios: [],
        tags: [],
      })
    }
  }

  return getAnimeById
}

export default useFetchAnimeById
