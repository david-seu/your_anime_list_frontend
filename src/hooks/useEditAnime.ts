import { SetStateAction, Dispatch } from 'react'
import Anime from '../data/Anime'
import { useAnimeStore } from '../store/useAnimeStore'
import { updateAnime } from '../services/AnimeService'
import User from '../data/User'

interface UseEditAnimeProps {
  user: User
  id: string
  title: string
  score: number
  watched: boolean
  numEpisodes: number
  setSnackbarOpen: Dispatch<SetStateAction<boolean>>
  setSnackbarType: Dispatch<SetStateAction<string>>
  setSnackbarMessage: Dispatch<SetStateAction<string>>
}

const useEditAnime = ({
  user,
  id,
  title,
  score,
  watched,
  numEpisodes,
  setSnackbarOpen,
  setSnackbarType,
  setSnackbarMessage,
}: UseEditAnimeProps) => {
  const updateAnimeStore = useAnimeStore((state) => state.updateAnime)

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    if (!user) return

    const newAnime: Anime = {
      id: Number(id),
      title,
      watched,
      score: Number(score),
      checked: false,
      numEpisodes,
    }
    updateAnimeStore(newAnime)

    updateAnime(Number(id), newAnime, user!.token)
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
