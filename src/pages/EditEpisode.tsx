/* eslint-disable import/no-named-as-default */
import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useParams } from 'react-router-dom'
import { AlertColor } from '@mui/material'
import CustomizedSnackbars from '../components/CustomizedSnackBars'
import useEpisodeStore from '../store/useEpisodeStore'
import Episode from '../data/Episode'
import { getEpisode, updateEpisode } from '../services/EpisodeService'

export default function EditEpisode(): JSX.Element {
  const [title, setTitle] = useState<string>('')
  const [number, setNumber] = React.useState<number>(0)
  const [season, setSeason] = React.useState<number>(0)
  const [score, setScore] = useState<number>(0)
  const [watched, setWatched] = useState<boolean>(false)
  const [animeTitle, setAnimeTitle] = useState('')

  const updateEpisodeStore = useEpisodeStore((state) => state.updateEpisode)
  const getEpisodeStore = useEpisodeStore((state) => state.getEpisode)

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
      animeTitle,
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

  useEffect(() => {
    if (id) {
      const episode = getEpisodeStore(Number(id))

      getEpisode(Number(id))
        .then(
          (result: {
            data: {
              title: string
              number: number
              season: number
              score: number
              watched: boolean
              animeTitle: string
            }
          }) => {
            setTitle(result.data.title)
            setNumber(result.data.number)
            setSeason(result.data.season)
            setScore(result.data.score)
            setWatched(result.data.watched)
            setAnimeTitle(result.data.animeTitle)
          }
        )
        .catch(() => {
          if (episode) {
            setTitle(episode.title)
            setNumber(episode.number)
            setSeason(episode.season)
            setScore(episode.score)
            setWatched(episode.watched)
          }
        })
    }
  }, [id, getEpisodeStore])

  return (
    <div>
      <Link to="/">
        <button type="button" className="btn btn-primary btn-lg btn-add">
          Back to Home
        </button>
      </Link>
      <div className="edit--container">
        <Form>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formNumber">
            <Form.Label className="">Number</Form.Label>
            <Form.Control
              type="number"
              value={number}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNumber(Number(e.target.value))
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSeason">
            <Form.Label className="">Season</Form.Label>
            <Form.Control
              type="number"
              value={season}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSeason(Number(e.target.value))
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formScore">
            <Form.Label className="">Score</Form.Label>
            <Form.Control
              type="number"
              value={score}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setScore(Number(e.target.value))
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formWatched">
            <Form.Check
              type="checkbox"
              label="Watched"
              checked={watched}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setWatched(e.target.checked)
              }
            />
          </Form.Group>
          <Button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              handleSubmit(e)
            }
            type="submit"
          >
            Update
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
