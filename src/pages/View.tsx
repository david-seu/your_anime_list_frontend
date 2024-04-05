import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getAnime } from '../services/AnimeService'

function View(): JSX.Element {
  const [title, setTitle] = useState<string>('')
  const [score, setScore] = useState<number>(0)
  const [watched, setWatched] = useState<boolean>(false)

  const { id } = useParams<{ id: string }>() as unknown as { id: number }

  useEffect(() => {
    if (id) {
      getAnime(id).then(
        (result: {
          data: { title: string; score: number; watched: boolean }
        }) => {
          setTitle(result.data.title)
          setScore(result.data.score)
          setWatched(result.data.watched)
        }
      )
    }
  }, [id])

  return (
    <div>
      <Link to="/">
        <button type="button" className="btn btn-primary btn-lg btn-add">
          Back to Home
        </button>
      </Link>
      <div className="view--container">
        <h1>{title}</h1>
        <p>Watched: {watched ? 'Yes' : 'No'}</p>
        <p>Score: {score < 0 ? 'N/A' : score}</p>
      </div>
    </div>
  )
}

export default View
