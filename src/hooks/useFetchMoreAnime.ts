import Anime from '../data/Anime'
import { fetchAnime } from '../services/AnimeService'
// eslint-disable-next-line import/no-named-as-default
import useAnimeStore from '../store/useAnimeStore'

interface UseFetchMoreAnimeProps {
  setSnackbarType: (type: string) => void
  setSnackbarMessage: (message: string) => void
  setSnackbarOpen: (open: boolean) => void
}

const useFetchMoreAnime = ({
  setSnackbarType,
  setSnackbarMessage,
  setSnackbarOpen,
}: UseFetchMoreAnimeProps) => {
  const page = useAnimeStore((state) => state.page)
  const setHasMoreStore = useAnimeStore((state) => state.setHasMore)
  const nextPage = useAnimeStore((state) => state.nextPage)
  const appendAnimeList = useAnimeStore((state) => state.appendAnimeList)
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

  const fetchMoreAnime = () => {
    nextPage()
    fetchAnime(
      page,
      sortDirection,
      title,
      season,
      year,
      genres,
      tags,
      studios,
      type,
      status,
      orderBy
    )
      .then((result: { data: Anime[]; status: number }) => {
        if (result.status === 200) {
          appendAnimeList(result.data)
          setSnackbarType('success')
          setSnackbarMessage('Successfully fetched anime')
        } else if (result.status === 204) {
          setHasMoreStore(false)
          setSnackbarType('info')
          setSnackbarMessage('No anime found')
        }
      })
      .catch((error: { message: string }) => {
        if (error.message === 'Network Error') {
          setSnackbarType('error')
          setSnackbarMessage('Failed to fetch anime, server is down')
        } else {
          setSnackbarType('warning')
          setSnackbarMessage('Unknown error')
        }
      })
      .finally(() => {
        setSnackbarOpen(true)
      })
  }

  return fetchMoreAnime
}

export default useFetchMoreAnime
