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
  animeList: Anime[]
}

const useHandleDeleteAnime = ({
  setSnackbarType,
  setSnackbarMessage,
  setSnackbarOpen,
  animeList,
}: UseHandleDeleteAnimeProps) => {
  const episodeList = useEpisodeStore((state) => state.getAllEpisodes)()
  const setEpisodeStore = useEpisodeStore((state) => state.setEpisodeList)
  const deleteAnimeStore = useAnimeStore((state) => state.deleteAnime)

  return useCallback(() => {
    animeList.forEach(async (anime) => {
      if (anime.checked) {
        deleteAnimeStore(anime.id)
        deleteAnime(anime.id)
          .then((result) => {
            if (result.status === 204) {
              setSnackbarType('success')
              setSnackbarMessage('Successfully deleted anime')
            } else {
              setSnackbarType('error')
              setSnackbarMessage('Failed to delete anime')
            }
          })
          .catch(() => {
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
    setEpisodeStore,
    episodeList,
    setSnackbarOpen,
  ])
}

export default useHandleDeleteAnime
