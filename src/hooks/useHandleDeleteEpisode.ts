import { useCallback } from 'react'
import Episode from '../data/Episode'
import { deleteEpisode } from '../services/EpisodeService'
// eslint-disable-next-line import/no-named-as-default
import useEpisodeStore from '../store/useEpisodeStore'
import User from '../data/User'

interface UseHandleDeleteEpisodeProps {
  user: User
  setSnackbarType: (type: string) => void
  setSnackbarMessage: (message: string) => void
  setSnackbarOpen: (open: boolean) => void
  episodeList: Episode[]
}

const useHandleDeleteEpisode = ({
  user,
  setSnackbarType,
  setSnackbarMessage,
  setSnackbarOpen,
  episodeList,
}: UseHandleDeleteEpisodeProps) => {
  const deleteEpisodeStore = useEpisodeStore((state) => state.deleteEpisode)

  return useCallback(() => {
    if (!user) return

    episodeList.forEach(async (episode) => {
      if (episode.checked) {
        deleteEpisodeStore(episode.id)

        deleteEpisode(episode.id, user!.token)
          .then((result) => {
            if (result.status === 204) {
              setSnackbarType('success')
              setSnackbarMessage('Successfully deleted episode')
            } else {
              setSnackbarType('error')
              setSnackbarMessage('Failed to delete episode')
            }
          })
          .catch(() => {
            setSnackbarType('warning')
            setSnackbarMessage('Server is down, but episode deleted locally')
          })
          .finally(() => {
            setSnackbarOpen(true)
          })
      }
    })
  }, [
    episodeList,
    deleteEpisodeStore,
    user,
    setSnackbarType,
    setSnackbarMessage,
    setSnackbarOpen,
  ])
}

export default useHandleDeleteEpisode
