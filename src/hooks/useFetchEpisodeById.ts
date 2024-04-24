import { useEffect } from 'react'
// eslint-disable-next-line import/no-named-as-default
import useEpisodeStore from '../store/useEpisodeStore'
import { getEpisode } from '../services/EpisodeService'

interface UseFetchEpisdeByIdProps {
  id: string
  setTitle: (title: string) => void
  setNumber: (number: number) => void
  setSeason: (season: number) => void
  setScore: (score: number) => void
  setWatched: (watched: boolean) => void
  setAnimeTitle: (animeTitle: string) => void
}

const useFetchEpisodeById = ({
  id,
  setTitle,
  setNumber,
  setSeason,
  setScore,
  setWatched,
  setAnimeTitle,
}: UseFetchEpisdeByIdProps) => {
  const getEpisodeStore = useEpisodeStore((state) => state.getEpisode)

  useEffect(() => {
    if (id) {
      const episode = getEpisodeStore(Number(id))

      getEpisode(Number(id))
        .then(
          (result: {
            data: {
              title: string
              number: number
              season: number
              score: number
              watched: boolean
              animeTitle: string
            }
          }) => {
            setTitle(result.data.title)
            setNumber(result.data.number)
            setSeason(result.data.season)
            setScore(result.data.score)
            setWatched(result.data.watched)
            setAnimeTitle(result.data.animeTitle)
          }
        )
        .catch(() => {
          if (episode) {
            setTitle(episode.title)
            setNumber(episode.number)
            setSeason(episode.season)
            setScore(episode.score)
            setWatched(episode.watched)
            setAnimeTitle(episode.animeTitle)
          }
        })
    }
  }, [
    id,
    getEpisodeStore,
    setTitle,
    setNumber,
    setSeason,
    setScore,
    setWatched,
    setAnimeTitle,
  ])
}

export default useFetchEpisodeById
