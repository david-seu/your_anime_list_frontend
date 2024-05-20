import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AlertColor } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import CustomizedSnackbars from '../components/CustomizedSnackBars'
import LinkButton from '../components/LinkButton'
import useAddEpisode from '../hooks/useAddEpisode'
import AddEpisodeForm from '../components/AddEpisodeForm'
// eslint-disable-next-line import/no-named-as-default
import useUserStore from '../store/useUserStore'

export default function AddEpisode() {
  const [title, setTitle] = React.useState('')
  const [number, setNumber] = React.useState<number>(0)
  const [season, setSeason] = React.useState<number>(0)
  const [score, setScore] = React.useState<number>(0)
  const [watched, setWatched] = React.useState(false)
  const [animeTitle, setAnimeTitle] = React.useState('')
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

  const handleSubmit = useAddEpisode({
    user,
    title,
    number,
    season,
    score,
    watched,
    animeTitle,
    setSnackbarOpen,
    setSnackbarType,
    setSnackbarMessage,
  })

  return (
    <div>
      <LinkButton to="/home">Back</LinkButton>
      <div className="add--container">
        <AddEpisodeForm
          setTitle={setTitle}
          setNumber={setNumber}
          setSeason={setSeason}
          setScore={setScore}
          setWatched={setWatched}
          setAnimeTitle={setAnimeTitle}
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
