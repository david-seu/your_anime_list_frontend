/* eslint-disable import/no-named-as-default */
import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AlertColor, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import AnimePreviewList from '../components/AnimeListPreview'
import useFetchTop100Anime from '../hooks/useFetchTop100Anime'
import CustomizedSnackbars from '../components/CustomizedSnackBars'
import useFetchMostPopularAnimeThisSeason from '../hooks/useFetchMostPopularAnimeThisSeason'
import useFetchMostPopularAnime from '../hooks/useFetchMostPopularAnime'
import useAnimeStore from '../store/useAnimeStore'
import HandlerButton from '../components/HandlerButton'
import getCurrentSeason from '../utils/getCurrentSeason'
import AnimeGridPreviw from '../components/AnimeGridPreview'
import StyledButton from '../components/StyledButton'

export default function Home(): JSX.Element {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarType, setSnackbarType] = useState('')
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const top100Anime = useAnimeStore((state) => state.top100AnimeList)
  const mostPopularAnime = useAnimeStore((state) => state.mostPopularAnimeList)
  const mostPopularAnimeThisSeason = useAnimeStore(
    (state) => state.mostPopularAnimeThisSeasonList
  )
  const setSortDirection = useAnimeStore((state) => state.setSortDirection)
  const setOrderBy = useAnimeStore((state) => state.setOrderBy)
  const setSeason = useAnimeStore((state) => state.setSeason)
  const setYear = useAnimeStore((state) => state.setYear)
  const navigate = useNavigate()

  const fetchTop100Anime = useFetchTop100Anime({
    setSnackbarType,
    setSnackbarMessage,
    setSnackbarOpen,
  })

  const fetchMostPopularAnime = useFetchMostPopularAnime({
    setSnackbarType,
    setSnackbarMessage,
    setSnackbarOpen,
  })

  const fetchMostPopularAnimeThisSeason = useFetchMostPopularAnimeThisSeason({
    setSnackbarType,
    setSnackbarMessage,
    setSnackbarOpen,
  })

  useEffect(() => {
    console.log('fetching data')
    fetchTop100Anime()
    fetchMostPopularAnime()
    fetchMostPopularAnimeThisSeason()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAllTimePopularClick = () => {
    setSortDirection('asc')
    setOrderBy('popularity')
    setSeason(null)
    setYear(null)
    navigate('/anime')
  }

  const handleSeasonPopularClick = () => {
    setSortDirection('asc')
    setOrderBy('popularity')
    setSeason(getCurrentSeason())
    setYear(new Date().getFullYear())
    navigate('/anime')
  }

  const handleTop100Click = () => {
    setSortDirection('desc')
    setOrderBy('score')
    setSeason(null)
    setYear(null)
    navigate('/anime')
  }

  return (
    <div>
      <div className="home-container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Typography variant="h4" className="title">
            Popular this Season
          </Typography>
          <StyledButton onClick={handleSeasonPopularClick}>
            View All
          </StyledButton>
        </div>
        <div className="table">
          <AnimeGridPreviw animeList={mostPopularAnimeThisSeason.slice(0, 8)} />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Typography variant="h4" className="title">
            All Time Popular
          </Typography>
          <StyledButton onClick={handleAllTimePopularClick}>
            View All
          </StyledButton>
        </div>
        <div className="table">
          <AnimeGridPreviw animeList={mostPopularAnime.slice(0, 8)} />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Typography
            variant="h4"
            className="title"
            sx={{ boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)' }}
          >
            Top 100
          </Typography>
          <StyledButton onClick={handleTop100Click}>View All</StyledButton>
        </div>

        <AnimePreviewList animeList={top100Anime.slice(0, 5)} />
      </div>
      <CustomizedSnackbars
        open={snackbarOpen}
        type={snackbarType as AlertColor}
        message={snackbarMessage}
        handleClose={() => setSnackbarOpen(false)}
      />
    </div>
  )
}
