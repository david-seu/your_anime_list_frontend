import { useState } from 'react'
import { useParams } from 'react-router-dom'
// eslint-disable-next-line import/no-named-as-default
import LinkButton from '../components/LinkButton'
import useFetchEpisodeById from '../hooks/useFetchEpisodeById'

function ViewEpisode(): JSX.Element {
  const [title, setTitle] = useState<string>('')
  const [number, setNumber] = useState<number>(0)
  const [season, setSeason] = useState<number>(0)
  const [score, setScore] = useState<number>(0)
  const [watched, setWatched] = useState<boolean>(false)
  const [animeTitle, setAnimeTitle] = useState('')

  const { id } = useParams<{ id: string }>() as unknown as { id: string }

  useFetchEpisodeById({
    id,
    setTitle,
    setNumber,
    setSeason,
    setScore,
    setWatched,
    setAnimeTitle,
  })

  return (
    <div>
      <LinkButton to="/">Back</LinkButton>
      <LinkButton to={`/editEpisode/${id}`}>Edit</LinkButton>
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
