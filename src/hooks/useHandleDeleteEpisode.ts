import { useCallback } from 'react'
import Episode from '../data/Episode'
import { deleteEpisode } from '../services/EpisodeService'
// eslint-disable-next-line import/no-named-as-default
import useEpisodeStore from '../store/useEpisodeStore'

interface UseHandleDeleteEpisodeProps {
  setSnackbarType: (type: string) => void
  setSnackbarMessage: (message: string) => void
  setSnackbarOpen: (open: boolean) => void
  deleteEpisodeStore: (id: number) => void
  episodeList: Episode[]
}

const useHandleDeleteEpisode = ({
  setSnackbarType,
  setSnackbarMessage,
  setSnackbarOpen,
  deleteEpisodeStore,
  episodeList,
}: UseHandleDeleteEpisodeProps) => {
  const updateEpisodeStore = useEpisodeStore((state) => state.updateEpisode)
  return useCallback(() => {
    episodeList.forEach(async (episode) => {
      if (episode.checked) {
        if (episode.persisted === false) {
          deleteEpisodeStore(episode.id)
          setSnackbarType('success')
          setSnackbarMessage('Successfully deleted episode')
          setSnackbarOpen(true)
        } else {
          deleteEpisode(episode.id)
            .then((result) => {
              if (result.status === 204) {
                deleteEpisodeStore(episode.id)
                setSnackbarType('success')
                setSnackbarMessage('Successfully deleted episode')
              } else {
                // eslint-disable-next-line no-param-reassign
                episode.persisted = false
                updateEpisodeStore(episode)
                setSnackbarType('error')
                setSnackbarMessage('Failed to delete episode')
              }
            })
            .catch(() => {
              // eslint-disable-next-line no-param-reassign
              episode.persisted = false
              updateEpisodeStore(episode)
              setSnackbarType('warning')
              setSnackbarMessage('Server is down, but episode deleted locally')
            })
            .finally(() => {
              setSnackbarOpen(true)
            })
        }
      }
    })
  }, [
    episodeList,
    deleteEpisodeStore,
    setSnackbarType,
    setSnackbarMessage,
    updateEpisodeStore,
    setSnackbarOpen,
  ])
}

export default useHandleDeleteEpisode
