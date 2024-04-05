import { SetStateAction, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import { AlertColor } from '@mui/material/Alert'
import { deleteAnime, listAnime } from '../services/AnimeService'
import Anime from '../data/Anime'
import CustomizedSnackbars from '../components/CustomizedSnackBars'
// eslint-disable-next-line import/no-named-as-default
import useAnimeStore from '../store/useAnimeStore'

export default function Home(): JSX.Element {
  const [animeList, setAnimeList] = useState<Anime[]>([])
  const animeListStore = useAnimeStore((state) => state.animeList)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarType, setSnackbarType] = useState('')
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const deleteAnimeStore = useAnimeStore((state) => state.deleteAnime)

  useEffect(() => {
    listAnime()
      .then((result: { data: SetStateAction<Anime[]>; status: number }) => {
        setAnimeList(result.data)
      })
      .catch(() => {
        setAnimeList(animeListStore)
        setSnackbarType('error')
        setSnackbarMessage('Failed to fetch anime')
        setSnackbarOpen(true)
      })
  }, [animeListStore])

  const handleDelete = (): void => {
    animeList.forEach(async (anime) => {
      if (anime.checked) {
        deleteAnime(anime.id)
          .then((result) => {
            deleteAnimeStore(anime.id)
            if (result.status === 204) {
              setSnackbarType('success')
              setSnackbarMessage('Successfully deleted anime')
              setSnackbarOpen(true)
            } else {
              setSnackbarType('error')
              setSnackbarMessage('Failed to delete anime')
              setSnackbarOpen(true)
            }
          })
          .catch(() => {
            setSnackbarType('error')
            setSnackbarMessage('Failed to delete anime')
            setSnackbarOpen(true)
          })
      }
    })
    setAnimeList((prevList) => prevList.filter((anime) => !anime.checked))
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
