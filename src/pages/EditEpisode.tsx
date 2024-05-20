/* eslint-disable import/no-named-as-default */
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate, useParams } from 'react-router-dom'
import { AlertColor } from '@mui/material'
import CustomizedSnackbars from '../components/CustomizedSnackBars'
import useFetchEpisodeById from '../hooks/useFetchEpisodeById'
import LinkButton from '../components/LinkButton'
import EditEpisodeForm from '../components/EditEpisodeForm'
import useEditEpisode from '../hooks/useEditEpisode'
import useUserStore from '../store/useUserStore'

export default function EditEpisode(): JSX.Element {
  const [title, setTitle] = useState<string>('')
  const [number, setNumber] = React.useState<number>(0)
  const [season, setSeason] = React.useState<number>(0)
  const [score, setScore] = useState<number>(0)
  const [watched, setWatched] = useState<boolean>(false)
  const [animeTitle, setAnimeTitle] = useState<string>('')

  const { id } = useParams<{ id: string }>() as { id: string }

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

  const handleSubmit = useEditEpisode({
    user,
    id,
    title,
    number,
    season,
    watched,
    score,
    animeTitle,
    setSnackbarOpen,
    setSnackbarType,
    setSnackbarMessage,
  })

  useFetchEpisodeById({
    user,
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
      <LinkButton to="/home">Back</LinkButton>
      <div className="edit--container">
        <EditEpisodeForm
          title={title}
          number={number}
          season={season}
          score={score}
          watched={watched}
          setTitle={setTitle}
          setNumber={setNumber}
          setSeason={setSeason}
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
