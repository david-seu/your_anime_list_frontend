/* eslint-disable import/no-named-as-default */
import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useParams } from 'react-router-dom'
import { AlertColor } from '@mui/material'
import Anime from '../data/Anime'
import { getAnime, updateAnime } from '../services/AnimeService'
import CustomizedSnackbars from '../components/CustomizedSnackBars'
import useAnimeStore from '../store/useAnimeStore'

export default function Edit(): JSX.Element {
  const [title, setTitle] = useState<string>('')
  const [score, setScore] = useState<number>(0)
  const [watched, setWatched] = useState<boolean>(false)

  const updateAnimeStore = useAnimeStore((state) => state.updateAnime)

  const { id } = useParams<{ id: string }>() as { id: string }

  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarType, setSnackbarType] = useState('')
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>): void => {
    e.preventDefault()

    const newAnime: Anime = {
      id: Number(id),
      title,
      watched,
      score: Number(score),
      checked: false,
    }

    updateAnime(Number(id), newAnime).then((result) => {
      updateAnimeStore(newAnime)
      if (result.status === 200) {
        setSnackbarType('success')
        setSnackbarMessage('Anime updated successfully')
      } else {
        setSnackbarType('error')
        setSnackbarMessage('Error updating anime')
      }
      setSnackbarOpen(true)
    })
  }

  useEffect(() => {
    if (id) {
      getAnime(Number(id)).then(
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
          <Form.Group className="mb-3" controlId="formSore">
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
