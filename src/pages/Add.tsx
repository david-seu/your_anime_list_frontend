import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import { AlertColor } from '@mui/material'
import { addAnime } from '../services/AnimeService'
import Anime from '../data/Anime'
import CustomizedSnackbars from '../components/CustomizedSnackBars'
// eslint-disable-next-line import/no-named-as-default
import useAnimeStore from '../store/useAnimeStore'

export default function Add() {
  const [title, setTitle] = React.useState('')
  const [score, setScore] = React.useState<number>(0)
  const [watched, setWatched] = React.useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarType, setSnackbarType] = useState('')
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const addAnimeStore = useAnimeStore((state) => state.addAnime)

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    const id = Date.now()

    const newAnime: Anime = {
      id,
      title,
      watched,
      score,
      checked: false,
      persisted: false,
    }

    addAnime(newAnime)
      .then((result) => {
        if (result.status !== 201) {
          newAnime.persisted = false
          setSnackbarType('error')
          setSnackbarMessage('Failed to add anime')
        } else {
          setSnackbarType('success')
          setSnackbarMessage('Successfully added anime')
        }
      })
      .catch(() => {
        newAnime.persisted = false
        setSnackbarType('warning')
        setSnackbarMessage('Server is down, but anime added locally')
      })
      .finally(() => {
        addAnimeStore(newAnime)
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
            <Form.Label>Score</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter score"
              required
              onChange={(e) => setScore(Number(e.target.value))}
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
