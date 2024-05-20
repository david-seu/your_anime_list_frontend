import { useEffect } from 'react'
import Anime from '../data/Anime'
import { listAnime } from '../services/AnimeService'
// eslint-disable-next-line import/no-named-as-default
import useAnimeStore from '../store/useAnimeStore'
import User from '../data/User'

interface UseFetchAnimeProps {
  setAnimeStore: (anime: Anime[]) => void
  setSnackbarType: (type: string) => void
  setSnackbarMessage: (message: string) => void
  setSnackbarOpen: (open: boolean) => void
  user: User
}

const useFetchAnime = ({
  setAnimeStore,
  setSnackbarType,
  setSnackbarMessage,
  setSnackbarOpen,
  user,
}: UseFetchAnimeProps) => {
  const page = useAnimeStore((state) => state.page)

  useEffect(() => {
    if (!user) return

    listAnime(page, user!.token)
      .then((result: { data: Anime[]; status: number }) => {
        if (result.status === 200) {
          setAnimeStore(result.data)
          setSnackbarType('success')
          setSnackbarMessage('Successfully fetched anime')
        } else if (result.status === 204) {
          setAnimeStore([])
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
  }, [
    page,
    setAnimeStore,
    setSnackbarMessage,
    setSnackbarOpen,
    setSnackbarType,
    user,
  ])
}

export default useFetchAnime
