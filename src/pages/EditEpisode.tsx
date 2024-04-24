/* eslint-disable import/no-named-as-default */
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useParams } from 'react-router-dom'
import { AlertColor } from '@mui/material'
import CustomizedSnackbars from '../components/CustomizedSnackBars'
import useEpisodeStore from '../store/useEpisodeStore'
import Episode from '../data/Episode'
import { updateEpisode } from '../services/EpisodeService'
import useFetchEpisodeById from '../hooks/useFetchEpisodeById'
import LinkButton from '../components/LinkButton'
import EditEpisodeForm from '../components/EditEpisodeForm'

export default function EditEpisode(): JSX.Element {
  const [title, setTitle] = useState<string>('')
  const [number, setNumber] = React.useState<number>(0)
  const [season, setSeason] = React.useState<number>(0)
  const [score, setScore] = useState<number>(0)
  const [watched, setWatched] = useState<boolean>(false)
  const [, setAnimeTitle] = useState<string>('')

  const updateEpisodeStore = useEpisodeStore((state) => state.updateEpisode)

  const { id } = useParams<{ id: string }>() as { id: string }

  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarType, setSnackbarType] = useState('')
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>): void => {
    e.preventDefault()

    const newEpisode: Episode = {
      id: Number(id),
      title,
      number,
      season,
      watched,
      score: Number(score),
      checked: false,
      animeTitle: '',
      persisted: true,
    }

    updateEpisode(Number(id), newEpisode)
      .then((result) => {
        if (result.status === 200) {
          setSnackbarType('success')
          setSnackbarMessage('Episode updated successfully')
        } else {
          setSnackbarType('error')
          setSnackbarMessage('Error updating episode')
        }
      })
      .catch(() => {
        setSnackbarType('warning')
        setSnackbarMessage('Server is down, but episode updated locally')
      })
      .finally(() => {
        updateEpisodeStore(newEpisode)
        setSnackbarOpen(true)
      })
  }

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
