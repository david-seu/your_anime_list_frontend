import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AlertColor } from '@mui/material'
import CustomizedSnackbars from '../components/CustomizedSnackBars'
import LinkButton from '../components/LinkButton'
import AddAnimeForm from '../components/AddAnimeForm'
import useAddAnime from '../hooks/useAddAnime'

export default function AddAnime() {
  const [title, setTitle] = React.useState('')
  const [score, setScore] = React.useState<number>(0)
  const [watched, setWatched] = React.useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarType, setSnackbarType] = useState('')
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const handleSubmit = useAddAnime({
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
      <div className="add--container">
        <AddAnimeForm
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
