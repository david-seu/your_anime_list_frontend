import AnimeUser from '../data/AnimeUser'
import { fetchAnimeUser } from '../services/AnimeUserService'
// eslint-disable-next-line import/no-named-as-default
import useAnimeUserStore from '../store/useAnimeUserStore'
// eslint-disable-next-line import/no-named-as-default
import useUserStore from '../store/useUserStore'

interface UseFetchMoreAnimeUserProps {
  setSnackbarType: (type: string) => void
  setSnackbarMessage: (message: string) => void
  setSnackbarOpen: (open: boolean) => void
}

const useFetchMoreAnimeUser = ({
  setSnackbarType,
  setSnackbarMessage,
  setSnackbarOpen,
}: UseFetchMoreAnimeUserProps) => {
  const user = useUserStore((state) => state.currentUser)
  const page = useAnimeUserStore((state) => state.page)
  const setHasMoreStore = useAnimeUserStore((state) => state.setHasMore)
  const nextPage = useAnimeUserStore((state) => state.nextPage)
  const appendAnimeList = useAnimeUserStore((state) => state.appendAnimeList)
  // const title = useAnimeUserStore((state) => state.title)
  // const sortDirection = useAnimeUserStore((state) => state.sortDirection)
  // const season = useAnimeUserStore((state) => state.season)
  // const year = useAnimeUserStore((state) => state.year)
  // const genres = useAnimeUserStore((state) => state.genres)
  // const tags = useAnimeUserStore((state) => state.tags)
  // const studios = useAnimeUserStore((state) => state.studios)
  // const type = useAnimeUserStore((state) => state.type)
  // const status = useAnimeUserStore((state) => state.status)
  // const orderBy = useAnimeUserStore((state) => state.orderBy)

  const fetchMoreAnime = () => {
    if (!user) return
    nextPage()
    fetchAnimeUser(page, user.id, user.token, '', 'desc')
      .then((result: { data: AnimeUser[]; status: number }) => {
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

export default useFetchMoreAnimeUser
