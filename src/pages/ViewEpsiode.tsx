import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
// eslint-disable-next-line import/no-named-as-default
import useEpisodeStore from '../store/useEpisodeStore'
import { getEpisode } from '../services/EpisodeService'

function ViewEpisode(): JSX.Element {
  const [title, setTitle] = useState<string>('')
  const [number, setNumber] = useState<number>(0)
  const [season, setSeason] = useState<number>(0)
  const [score, setScore] = useState<number>(0)
  const [watched, setWatched] = useState<boolean>(false)
  const [animeTitle, setAnimeTitle] = useState('')

  const getEpisodeStore = useEpisodeStore((state) => state.getEpisode)

  const { id } = useParams<{ id: string }>() as unknown as { id: string }

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
  }, [id, getEpisodeStore])

  return (
    <div>
      <Link to="/">
        <button type="button" className="btn btn-primary btn-lg btn-add">
          Back to Home
        </button>
      </Link>
      <div className="view--container">
        <h1>{title}</h1>
        <p>Number: {number}</p>
        <p>Season: {season}</p>
        <p>Watched: {watched ? 'Yes' : 'No'}</p>
        <p>Score: {score < 0 ? 'N/A' : score}</p>
        <p>Anime: {animeTitle}</p>
      </div>
    </div>
  )
}

export default ViewEpisode
