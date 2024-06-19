import { SetStateAction, Dispatch } from 'react'
import useUserStore from '../store/useUserStore'
import useAnimeStore from '../store/useAnimeStore'
import { deleteAnime } from '../services/AnimeService'
import Anime from '../data/Anime'

interface UseDeleteAnimeProps {
  setSnackbarOpen: Dispatch<SetStateAction<boolean>>
  setSnackbarType: Dispatch<SetStateAction<string>>
  setSnackbarMessage: Dispatch<SetStateAction<string>>
}

const useDeleteAnime = ({
  setSnackbarOpen,
  setSnackbarType,
  setSnackbarMessage,
}: UseDeleteAnimeProps) => {
  const deleteAnimeStore = useAnimeStore((state) => state.deleteAnime)
  const currentUser = useUserStore((state) => state.currentUser)!

  const handleSubmit = (anime: Anime): void => {
    if (!currentUser) return

    deleteAnimeStore(anime.id)

    deleteAnime(anime.id, currentUser!.token)
      .then((result) => {
        if (result.status === 204) {
          setSnackbarType('success')
          setSnackbarMessage('Anime deleted successfully')
        } else {
          setSnackbarType('error')
          setSnackbarMessage('Error deleting anime')
        }
      })
      .catch(() => {
        setSnackbarType('warning')
        setSnackbarMessage('Server is down, but anime deleted locally')
      })
      .finally(() => {
        setSnackbarOpen(true)
      })
  }

  return handleSubmit
}

export default useDeleteAnime
