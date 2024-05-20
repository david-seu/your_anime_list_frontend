import { useCallback } from 'react'
// eslint-disable-next-line import/no-named-as-default
import Anime from '../data/Anime'
import { deleteAnime } from '../services/AnimeService'
// eslint-disable-next-line import/no-named-as-default
import useEpisodeStore from '../store/useEpisodeStore'
// eslint-disable-next-line import/no-named-as-default
import useAnimeStore from '../store/useAnimeStore'
import User from '../data/User'

interface UseHandleDeleteAnimeProps {
  user: User
  setSnackbarType: (type: string) => void
  setSnackbarMessage: (message: string) => void
  setSnackbarOpen: (open: boolean) => void
  animeList: Anime[]
}

const useHandleDeleteAnime = ({
  user,
  setSnackbarType,
  setSnackbarMessage,
  setSnackbarOpen,
  animeList,
}: UseHandleDeleteAnimeProps) => {
  const episodeList = useEpisodeStore((state) => state.getAllEpisodes)()
  const setEpisodeStore = useEpisodeStore((state) => state.setEpisodeList)
  const deleteAnimeStore = useAnimeStore((state) => state.deleteAnime)

  return useCallback(() => {
    if (!user) return

    animeList.forEach(async (anime) => {
      if (anime.checked) {
        deleteAnimeStore(anime.id)
        deleteAnime(anime.id, user!.token)
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
    user,
    setSnackbarType,
    setSnackbarMessage,
    setEpisodeStore,
    episodeList,
    setSnackbarOpen,
  ])
}

export default useHandleDeleteAnime
