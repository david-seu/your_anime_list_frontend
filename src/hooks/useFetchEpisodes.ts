import { useEffect } from 'react'
import Episode from '../data/Episode'
import { listEpisode } from '../services/EpisodeService'
// eslint-disable-next-line import/no-named-as-default
import useEpisodeStore from '../store/useEpisodeStore'

interface UseFetchEpisodesProps {
  setEpisodeStore: (episodes: Episode[]) => void
  setSnackbarType: (type: string) => void
  setSnackbarMessage: (message: string) => void
  setSnackbarOpen: (open: boolean) => void
}

const useFetchEpisodes = ({
  setEpisodeStore,
  setSnackbarType,
  setSnackbarMessage,
  setSnackbarOpen,
}: UseFetchEpisodesProps) => {
  const page = useEpisodeStore((state) => state.page)
  useEffect(() => {
    listEpisode(page)
      .then((result: { data: Episode[]; status: number }) => {
        if (result.status === 200) {
          result.data.forEach((episode) => {
            // eslint-disable-next-line no-param-reassign
            episode.persisted = true
          })
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
  ])
}

export default useFetchEpisodes
