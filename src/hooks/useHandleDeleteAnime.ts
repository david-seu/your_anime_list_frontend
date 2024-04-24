import { useCallback } from 'react'
// eslint-disable-next-line import/no-named-as-default
import Anime from '../data/Anime'
import { deleteAnime } from '../services/AnimeService'
// eslint-disable-next-line import/no-named-as-default
import useEpisodeStore from '../store/useEpisodeStore'
// eslint-disable-next-line import/no-named-as-default
import useAnimeStore from '../store/useAnimeStore'

interface UseHandleDeleteAnimeProps {
  setSnackbarType: (type: string) => void
  setSnackbarMessage: (message: string) => void
  setSnackbarOpen: (open: boolean) => void
  deleteAnimeStore: (id: number) => void
  animeList: Anime[]
}

const useHandleDeleteAnime = ({
  setSnackbarType,
  setSnackbarMessage,
  setSnackbarOpen,
  deleteAnimeStore,
  animeList,
}: UseHandleDeleteAnimeProps) => {
  const episodeList = useEpisodeStore((state) => state.getAllEpisodes)()
  const setEpisodeStore = useEpisodeStore((state) => state.setEpisodeList)
  const updateAnimeStore = useAnimeStore((state) => state.updateAnime)
  return useCallback(() => {
    animeList.forEach(async (anime) => {
      if (anime.checked) {
        deleteAnime(anime.id)
          .then((result) => {
            if (result.status === 204) {
              deleteAnimeStore(anime.id)
              setSnackbarType('success')
              setSnackbarMessage('Successfully deleted anime')
            } else {
              // eslint-disable-next-line no-param-reassign
              anime.persisted = false
              updateAnimeStore(anime)
              setSnackbarType('error')
              setSnackbarMessage('Failed to delete anime')
            }
          })
          .catch(() => {
            // eslint-disable-next-line no-param-reassign
            anime.persisted = false
            updateAnimeStore(anime)
            episodeList.forEach((episode) => {
              if (episode.animeTitle === anime.title) {
                // eslint-disable-next-line no-param-reassign
                episode.persisted = false
                // eslint-disable-next-line no-param-reassign
                episode.checked = true
              }
            })
            setEpisodeStore(episodeList)
            setSnackbarType('warning')
            setSnackbarMessage('Server is down, but anime deleted locally')
          })
          .finally(() => {
            setSnackbarOpen(true)
          })
      }
    })
  }, [
    animeList,
    deleteAnimeStore,
    setSnackbarType,
    setSnackbarMessage,
    updateAnimeStore,
    episodeList,
    setEpisodeStore,
    setSnackbarOpen,
  ])
}

export default useHandleDeleteAnime
