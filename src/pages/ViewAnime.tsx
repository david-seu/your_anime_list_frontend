import { useState } from 'react'
import { useParams } from 'react-router-dom'
import LinkButton from '../components/LinkButton'
import useFetchAnimeById from '../hooks/useFetchAnimeById'

function ViewAnime(): JSX.Element {
  const [title, setTitle] = useState<string>('')
  const [score, setScore] = useState<number>(0)
  const [watched, setWatched] = useState<boolean>(false)
  const [numEpisodes, setNumEpisodes] = useState<number>(0)

  const { id } = useParams<{ id: string }>() as unknown as { id: string }

  useFetchAnimeById({
    id,
    setTitle,
    setScore,
    setWatched,
    setNumEpisodes,
  })

  return (
    <div>
      <LinkButton to="/">Back</LinkButton>
      <LinkButton to={`/editAnime/${id}`}>Edit</LinkButton>
      <div className="view--container">
        <h1>{title}</h1>
        <p>Watched: {watched ? 'Yes' : 'No'}</p>
        <p>Score: {score < 0 ? 'N/A' : score}</p>
        <p>Number of Episodes: {numEpisodes}</p>
      </div>
    </div>
  )
}

export default ViewAnime
