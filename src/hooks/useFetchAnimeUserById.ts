import AnimeUser from '../data/AnimeUser'
import { getAnimeUser } from '../services/AnimeUserService'
import useUserStore from '../store/useUserStore'

interface UseFetchAnimeUserByIdProps {
  setAnime: (anime: AnimeUser) => void
}

const useFetchAnimeUserById = ({ setAnime }: UseFetchAnimeUserByIdProps) => {
  const user = useUserStore((state) => state.currentUser)

  const getAnimeById = (animeId: number) => {
    if (!user) return

    getAnimeUser(animeId, user.id, user.token)
      .then((result: { data: AnimeUser }) => {
        setAnime(result.data)
      })
      .catch((e) => {
        if (e.response.status === 404) {
          setAnime({
            id: -1,
            anime: null,
            user: null,
            isFavorite: false,
            animeId,
            userId: user.id,
            status: 'PLAN_TO_WATCH',
            score: 0,
            startDate: new Date(),
            endDate: new Date(),
          })
        }
      })
  }

  return getAnimeById
}

export default useFetchAnimeUserById
