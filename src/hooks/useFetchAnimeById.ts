import { useEffect } from 'react'
import { useAnimeStore } from '../store/useAnimeStore'
import { getAnime } from '../services/AnimeService'

interface UseFetchAnimeByIdProps {
  id: string
  setTitle: (title: string) => void
  setScore: (score: number) => void
  setWatched: (watched: boolean) => void
}

const useFetchAnimeById = ({
  id,
  setTitle,
  setScore,
  setWatched,
}: UseFetchAnimeByIdProps) => {
  const getAnimeStore = useAnimeStore((state) => state.getAnime)

  useEffect(() => {
    if (id) {
      const anime = getAnimeStore(Number(id))

      getAnime(Number(id))
        .then(
          (result: {
            data: {
              title: string
              score: number
              watched: boolean
            }
          }) => {
            setTitle(result.data.title)
            setScore(result.data.score)
            setWatched(result.data.watched)
          }
        )
        .catch(() => {
          if (anime) {
            setTitle(anime.title)
            setScore(anime.score)
            setWatched(anime.watched)
          }
        })
    }
  }, [id, getAnimeStore, setTitle, setScore, setWatched])
}

export default useFetchAnimeById
