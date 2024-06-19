import AnimeUser from '../data/AnimeUser'
import { fetchAnimeUser } from '../services/AnimeUserService'
// eslint-disable-next-line import/no-named-as-default
import useAnimeStore from '../store/useAnimeStore'
import useAnimeUserStore from '../store/useAnimeUserStore'
import useUserStore from '../store/useUserStore'

interface UseFetchAnimeUserProps {
  setSnackbarType: (type: string) => void
  setSnackbarMessage: (message: string) => void
  setSnackbarOpen: (open: boolean) => void
}

const useFetchAnimeUser = ({
  setSnackbarType,
  setSnackbarMessage,
  setSnackbarOpen,
}: UseFetchAnimeUserProps) => {
  const page = useAnimeStore((state) => state.page)
  const user = useUserStore((state) => state.currentUser)
  const setAnimeUserList = useAnimeUserStore((state) => state.setAnimeList)
  const setHasMoreStore = useAnimeUserStore((state) => state.setHasMore)
  // const sortDirection = useAnimeUserStore((state) => state.sortDirection)
  // const season = useAnimeUserStore((state) => state.season)
  // const year = useAnimeUserStore((state) => state.year)
  // const genres = useAnimeUserStore((state) => state.genres)
  // const tags = useAnimeUserStore((state) => state.tags)
  // const studios = useAnimeUserStore((state) => state.studios)
  // const type = useAnimeUserStore((state) => state.type)
  // const status = useAnimeUserStore((state) => state.status)
  // const orderBy = useAnimeUserStore((state) => state.orderBy)

  const getAnime = () => {
    if (user === null) return
    fetchAnimeUser(page, user.id, user.token, '', 'desc')
      .then((result: { data: AnimeUser[]; status: number }) => {
        if (result.status === 200) {
          setAnimeUserList(result.data)
          if (result.data.length < 10) setHasMoreStore(false)
          else setHasMoreStore(true)
          setSnackbarType('success')
          setSnackbarMessage('Successfully fetched anime')
        } else if (result.status === 204) {
          setAnimeUserList([])
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
  return getAnime
}

export default useFetchAnimeUser
