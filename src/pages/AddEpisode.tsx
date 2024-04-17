import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import { AlertColor } from '@mui/material'
import CustomizedSnackbars from '../components/CustomizedSnackBars'
import Episode from '../data/Episode'
import { addEpisode } from '../services/EpisodeService'
// eslint-disable-next-line import/no-named-as-default
import useEpisodeStore from '../store/useEpisodeStore'

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
  const addEpisodeStore = useEpisodeStore((state) => state.addEpisode)

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    const id = Date.now()

    const newEpisode: Episode = {
      id,
      title,
      number,
      season,
      score,
      watched,
      checked: false,
      animeTitle,
    }

    addEpisode(newEpisode)
      .then((result) => {
        if (result.status !== 201) {
          addEpisodeStore(newEpisode)
          setSnackbarType('error')
          setSnackbarMessage('Failed to add episode')
        } else {
          addEpisodeStore(newEpisode)

          setSnackbarType('success')
          setSnackbarMessage('Successfully added episode')
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setSnackbarType('error')
          setSnackbarMessage('Failed to add episode, invalid anime title')
        } else {
          addEpisodeStore(newEpisode)
          setSnackbarType('warning')
          setSnackbarMessage('Server is down, but episode added locally')
        }
      })
      .finally(() => {
        setSnackbarOpen(true)
      })
  }

  return (
    <div>
      <Link to="/">
        <button type="button" className="btn btn-primary btn-lg btn-add">
          Back to Home
        </button>
      </Link>
      <div className="add--container">
        <Form className="gap-2">
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAge">
            <Form.Label>Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter episode number"
              required
              onChange={(e) => setNumber(Number(e.target.value))}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAge">
            <Form.Label>Season</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter season number"
              required
              onChange={(e) => setSeason(Number(e.target.value))}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAge">
            <Form.Label>Score</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter score"
              required
              onChange={(e) => setScore(Number(e.target.value))}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAge">
            <Form.Label>Anime</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the title of the anime it belongs"
              required
              onChange={(e) => setAnimeTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formWatched">
            <Form.Check
              type="checkbox"
              label="Watched"
              required
              onChange={(e) => setWatched(e.target.checked)}
            />
          </Form.Group>
          <Button onClick={(e) => handleSubmit(e)} type="submit">
            Submit
          </Button>
        </Form>
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
