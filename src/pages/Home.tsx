/* eslint-disable import/no-named-as-default */
import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AlertColor } from '@mui/material/Alert'
import { useNavigate } from 'react-router-dom'
import CustomizedSnackbars from '../components/CustomizedSnackBars'
import useAnimeStore from '../store/useAnimeStore'
import useEpisodeStore from '../store/useEpisodeStore'
import useFetchEpisodes from '../hooks/useFetchEpisodes'
import useFetchAnime from '../hooks/useFetchAnime'
import useHandleDeleteAnime from '../hooks/useHandleDeleteAnime'
import useHandleDeleteEpisode from '../hooks/useHandleDeleteEpisode'
import useHandleDownload from '../hooks/useHandleDownload'
import AnimeTable from '../components/AnimeTable'
import EpisodeTable from '../components/EpisodeTable'
import LinkButton from '../components/LinkButton'
import HandlerButton from '../components/HandlerButton'
import CustomNavBar from '../components/Navbar'
import useUserStore from '../store/useUserStore'

export default function Home(): JSX.Element {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarType, setSnackbarType] = useState('')
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const setAnimeStore = useAnimeStore((state) => state.setAnimeList)
  const setEpisodeStore = useEpisodeStore((state) => state.setEpisodeList)
  const animeList = useAnimeStore((state) => state.getAllAnime)()
  const episodeList = useEpisodeStore((state) => state.getAllEpisodes)()
  const user = useUserStore((state) => state.user)!
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user, navigate])

  useFetchEpisodes({
    user,
    setEpisodeStore,
    setSnackbarType,
    setSnackbarMessage,
    setSnackbarOpen,
  })

  useFetchAnime({
    user,
    setAnimeStore,
    setSnackbarType,
    setSnackbarMessage,
    setSnackbarOpen,
  })

  const handleDeleteAnime = useHandleDeleteAnime({
    user,
    setSnackbarType,
    setSnackbarMessage,
    setSnackbarOpen,
    animeList,
  })

  const handleDeleteEpisode = useHandleDeleteEpisode({
    user,
    setSnackbarType,
    setSnackbarMessage,
    setSnackbarOpen,
    episodeList,
  })

  const handleDownload = useHandleDownload()

  return (
    <div>
      <CustomNavBar />
      <div className="home--container">
        <h1>Your Anime List</h1>
        <br />
        <div className="tables--container">
          <div className="table">
            <AnimeTable animeList={animeList} />
          </div>
          <div className="table">
            <EpisodeTable episodeList={episodeList} />
          </div>
        </div>
        <br />
        <div className="button-container">
          <LinkButton to="/addAnime">Add Anime</LinkButton>
          <LinkButton to="/addEpisode">Add Episode</LinkButton>
          <HandlerButton onClick={handleDeleteAnime}>
            Delete Anime
          </HandlerButton>
          <HandlerButton onClick={handleDeleteEpisode}>
            Delete Episode
          </HandlerButton>
          <HandlerButton onClick={handleDownload}>Download Anime</HandlerButton>

          <CustomizedSnackbars
            open={snackbarOpen}
            type={snackbarType as AlertColor}
            message={snackbarMessage}
            handleClose={() => setSnackbarOpen(false)}
          />
        </div>
      </div>
    </div>
  )
}
