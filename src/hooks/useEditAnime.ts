import { SetStateAction, Dispatch } from 'react'
import Anime from '../data/Anime'
import { useAnimeStore } from '../store/useAnimeStore'
import { updateAnime } from '../services/AnimeService'
import useUserStore from '../store/useUserStore'

interface UseEditAnimeProps {
  anime: Anime
  setSnackbarOpen: Dispatch<SetStateAction<boolean>>
  setSnackbarType: Dispatch<SetStateAction<string>>
  setSnackbarMessage: Dispatch<SetStateAction<string>>
}

const useEditAnime = ({
  anime,
  setSnackbarOpen,
  setSnackbarType,
  setSnackbarMessage,
}: UseEditAnimeProps) => {
  const updateAnimeStore = useAnimeStore((state) => state.updateAnime)
  const currentUser = useUserStore((state) => state.currentUser)!

  const handleSubmit = (): void => {
    if (!currentUser) return

    updateAnimeStore(anime)

    updateAnime(anime, currentUser!.token)
      .then((result) => {
        if (result.status === 200) {
          setSnackbarType('success')
          setSnackbarMessage('Anime updated successfully')
        } else {
          setSnackbarType('error')
          setSnackbarMessage('Error updating anime')
        }
      })
      .catch(() => {
        setSnackbarType('warning')
        setSnackbarMessage('Server is down, but anime updated locally')
      })
      .finally(() => {
        setSnackbarOpen(true)
      })
  }

  return handleSubmit
}

export default useEditAnime
