import { useEffect } from 'react'
import Episode from '../data/Episode'
import { listEpisode } from '../services/EpisodeService'
// eslint-disable-next-line import/no-named-as-default
import useEpisodeStore from '../store/useEpisodeStore'
import User from '../data/User'

interface UseFetchEpisodesProps {
  user: User
  setEpisodeStore: (episodes: Episode[]) => void
  setSnackbarType: (type: string) => void
  setSnackbarMessage: (message: string) => void
  setSnackbarOpen: (open: boolean) => void
}

const useFetchEpisodes = ({
  user,
  setEpisodeStore,
  setSnackbarType,
  setSnackbarMessage,
  setSnackbarOpen,
}: UseFetchEpisodesProps) => {
  const page = useEpisodeStore((state) => state.page)
  useEffect(() => {
    if (!user) return

    listEpisode(page, user!.token)
      .then((result: { data: Episode[]; status: number }) => {
        if (result.status === 200) {
          setEpisodeStore(result.data)
          setSnackbarType('success')
          setSnackbarMessage('Successfully fetched episodes')
        } else if (result.status === 204) {
          setEpisodeStore([])
          setSnackbarType('info')
          setSnackbarMessage('No episodes found')
        }
      })
      .catch((error) => {
        if (error.message === 'Network Error') {
          setSnackbarType('error')
          setSnackbarMessage('Failed to fetch episode, server is down')
        } else {
          setSnackbarType('warning')
          setSnackbarMessage('Unknown error')
        }
      })
      .finally(() => {
        setSnackbarOpen(true)
      })
  }, [
    setEpisodeStore,
    setSnackbarType,
    setSnackbarMessage,
    setSnackbarOpen,
    page,
    user,
  ])
}

export default useFetchEpisodes
