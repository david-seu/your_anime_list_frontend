import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AlertColor } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import CustomizedSnackbars from '../components/CustomizedSnackBars'
import LinkButton from '../components/LinkButton'
import AddAnimeForm from '../components/AddAnimeForm'
import useAddAnime from '../hooks/useAddAnime'
// eslint-disable-next-line import/no-named-as-default
import useUserStore from '../store/useUserStore'

export default function AddAnime() {
  const [title, setTitle] = React.useState('')
  const [score, setScore] = React.useState<number>(0)
  const [watched, setWatched] = React.useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarType, setSnackbarType] = useState('')
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const user = useUserStore((state) => state.user)!
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user, navigate])

  const handleSubmit = useAddAnime({
    user,
    title,
    score,
    watched,
    setSnackbarOpen,
    setSnackbarType,
    setSnackbarMessage,
  })

  return (
    <div>
      <LinkButton to="/home">Back</LinkButton>
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
