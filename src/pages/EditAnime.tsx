/* eslint-disable import/no-named-as-default */
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useParams } from 'react-router-dom'
import { AlertColor } from '@mui/material'
import CustomizedSnackbars from '../components/CustomizedSnackBars'
import LinkButton from '../components/LinkButton'
import useFetchAnimeById from '../hooks/useFetchAnimeById'
import EditAnimeForm from '../components/EditAnimeForm'
import useEditAnime from '../hooks/useEditAnime'

export default function EditAnime(): JSX.Element {
  const [title, setTitle] = useState<string>('')
  const [score, setScore] = useState<number>(0)
  const [watched, setWatched] = useState<boolean>(false)

  const { id } = useParams<{ id: string }>() as { id: string }

  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarType, setSnackbarType] = useState('')
  const [snackbarMessage, setSnackbarMessage] = useState('')

  useFetchAnimeById({
    id,
    setTitle,
    setScore,
    setWatched,
  })

  const handleSubmit = useEditAnime({
    id,
    title,
    score,
    watched,
    setSnackbarOpen,
    setSnackbarType,
    setSnackbarMessage,
  })

  return (
    <div>
      <LinkButton to="/">Back</LinkButton>
      <div className="edit--container">
        <EditAnimeForm
          title={title}
          score={score}
          watched={watched}
          setTitle={setTitle}
          setScore={setScore}
          setWatched={setWatched}
          handleSubmit={handleSubmit}
        />
        <CustomizedSnackbars
          open={snackbarOpen}
          type={snackbarType as AlertColor}
          message={snackbarMessage}
          handleClose={() => setSnackbarOpen(false)}
        />
      </div>
    </div>
  )
}
