/* eslint-disable react/jsx-props-no-spreading */
import { AlertColor, Grid } from '@mui/material'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useEffect, useState } from 'react'
import HoverableCard from './HoverableCard'
import useAnimeStore from '../store/useAnimeStore'
import GridLoader from './GridLoader'
import CustomizedSnackbars from './CustomizedSnackBars'
import useFetchMoreAnime from '../hooks/useFetchMoreAnimeUser'
import useFetchAnime from '../hooks/useFetchAnime'

export default function AnimeGrid() {
  const animeList = useAnimeStore((state) => state.animeList)
  const hasMore = useAnimeStore((state) => state.hasMore)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarType, setSnackbarType] = useState('')
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const setPageStoreAnime = useAnimeStore((state) => state.setPage)
  const setHasMoreStore = useAnimeStore((state) => state.setHasMore)
  const setAnimeListStore = useAnimeStore((state) => state.setAnimeList)
  const title = useAnimeStore((state) => state.title)
  const sortDirection = useAnimeStore((state) => state.sortDirection)
  const season = useAnimeStore((state) => state.season)
  const year = useAnimeStore((state) => state.year)
  const genres = useAnimeStore((state) => state.genres)
  const tags = useAnimeStore((state) => state.tags)
  const studios = useAnimeStore((state) => state.studios)
  const type = useAnimeStore((state) => state.type)
  const status = useAnimeStore((state) => state.status)
  const orderBy = useAnimeStore((state) => state.orderBy)

  const fetchAnime = useFetchAnime({
    setSnackbarType,
    setSnackbarMessage,
    setSnackbarOpen,
  })

  useEffect(() => {
    setAnimeListStore([])
    setPageStoreAnime(0)
    setHasMoreStore(true)
    fetchAnime()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setAnimeListStore([])
    setPageStoreAnime(0)
    setHasMoreStore(true)
    fetchAnime()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    title,
    sortDirection,
    season,
    year,
    genres,
    tags,
    studios,
    type,
    status,
    orderBy,
  ])

  const fetchMoreData = useFetchMoreAnime({
    setSnackbarType,
    setSnackbarMessage,
    setSnackbarOpen,
  })

  return (
    <div>
      <InfiniteScroll
        dataLength={animeList.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<GridLoader />}
        style={{ backgroundColor: 'transparent' }}
      >
        <Grid container spacing={2}>
          {animeList.map((item, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              // eslint-disable-next-line react/no-array-index-key
              key={index}
            >
              <HoverableCard {...item} />
            </Grid>
          ))}
        </Grid>{' '}
      </InfiniteScroll>
      <CustomizedSnackbars
        open={snackbarOpen}
        type={snackbarType as AlertColor}
        message={snackbarMessage}
        handleClose={() => setSnackbarOpen(false)}
      />
    </div>
  )
}
