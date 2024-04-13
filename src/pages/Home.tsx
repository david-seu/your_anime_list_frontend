import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import { AlertColor } from '@mui/material/Alert'
import io from 'socket.io-client'
import { deleteAnime, listAnime } from '../services/AnimeService'
import Anime from '../data/Anime'
import CustomizedSnackbars from '../components/CustomizedSnackBars'
// eslint-disable-next-line import/no-named-as-default
import useAnimeStore from '../store/useAnimeStore'
import {
  NetworkStatusIndicator,
  ServerkStatusIndicator,
} from '../components/StatusIndicator'

export default function Home(): JSX.Element {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarType, setSnackbarType] = useState('')
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const deleteAnimeStore = useAnimeStore((state) => state.deleteAnime)
  const setAnimeStore = useAnimeStore((state) => state.setAnimeList)
  const addAnimeStore = useAnimeStore((state) => state.addAnime)
  const animeList = useAnimeStore((state) => state.animeList)

  useEffect(() => {
    const socket = io('http://localhost:8081')

    socket.on('/topic/anime', (newAnime) => {
      addAnimeStore(newAnime)
    })

    return () => {
      socket.disconnect()
    }
  }, [addAnimeStore, animeList])

  useEffect(() => {
    listAnime()
      .then((result: { data: Anime[]; status: number }) => {
        if (result.status === 200) {
          setAnimeStore(result.data)
          setSnackbarType('success')
          setSnackbarMessage('Successfully fetched anime')
        }
      })
      .catch((error) => {
        console.error(error)
        if (error.message === 'Network Error') {
          setSnackbarType('error')
          setSnackbarMessage('Failed to fetch anime, server is down')
        } else {
          setSnackbarType('warning')
          setSnackbarMessage('Unknown error, but anime fetched locally')
        }
      })
      .finally(() => {
        setSnackbarOpen(true)
      })
  }, [setAnimeStore])

  const handleDelete = (): void => {
    animeList.forEach(async (anime) => {
      if (anime.checked) {
        deleteAnime(anime.id)
          .then((result) => {
            if (result.status === 204) {
              setSnackbarType('success')
              setSnackbarMessage('Successfully deleted anime')
            } else {
              setSnackbarType('error')
              setSnackbarMessage('Failed to delete anime')
            }
          })
          .catch(() => {
            setSnackbarType('warning')
            setSnackbarMessage('Server is down, but anime deleted locally')
          })
          .finally(() => {
            deleteAnimeStore(anime.id)
            setSnackbarOpen(true)
          })
      }
    })
  }

  const handleDownload = (): void => {
    const fileData = localStorage.getItem('animeList')
    const blob = new Blob([fileData!], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'animeList.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="home--container">
      <NetworkStatusIndicator />
      <ServerkStatusIndicator />
      <h1>Your Anime List</h1>
      <br />
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Title</th>
            <th>Watched</th>
            <th>Score</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {animeList.map((anime: Anime) => {
            return (
              <tr key={anime.id}>
                <td>{anime.title}</td>
                <td>{anime.watched ? 'Yes' : 'No'}</td>
                <td>{anime.score > 0 ? anime.score : 'N/A'}</td>
                <td key={anime.id} className="button-container">
                  <Link to={`/edit/${anime.id}`}>
                    <button type="button" className="btn btn-primary">
                      Edit
                    </button>
                  </Link>
                  <Link to={`/view/${anime.id}`}>
                    <button type="button" className="btn btn-primary">
                      View
                    </button>
                  </Link>
                  <input
                    type="checkbox"
                    checked={anime.checked}
                    onChange={(e) => {
                      // eslint-disable-next-line no-param-reassign
                      anime.checked = e.target.checked
                    }}
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <br />

      <div className="button-container">
        <Link to="/add">
          <button type="button" className="btn btn-primary btn-lg btn-add">
            Add
          </button>
        </Link>
        <button
          type="button"
          className="btn btn-primary btn-lg btn-add"
          onClick={() => handleDelete()}
        >
          Delete
        </button>
        <button
          type="button"
          className="btn btn-primary btn-lg btn-add"
          onClick={() => handleDownload()}
        >
          Download
        </button>
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
