import { SetStateAction, Dispatch } from 'react'
import Anime from '../data/Anime'
import { useAnimeStore } from '../store/useAnimeStore'
import { updateAnime } from '../services/AnimeService'

interface UseEditAnimeProps {
  id: string
  title: string
  score: number
  watched: boolean
  setSnackbarOpen: Dispatch<SetStateAction<boolean>>
  setSnackbarType: Dispatch<SetStateAction<string>>
  setSnackbarMessage: Dispatch<SetStateAction<string>>
}

const useEditAnime = ({
  id,
  title,
  score,
  watched,
  setSnackbarOpen,
  setSnackbarType,
  setSnackbarMessage,
}: UseEditAnimeProps) => {
  const updateAnimeStore = useAnimeStore((state) => state.updateAnime)

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>): void => {
    e.preventDefault()

    const newAnime: Anime = {
      id: Number(id),
      title,
      watched,
      score: Number(score),
      checked: false,
      persisted: true,
    }

    updateAnime(Number(id), newAnime)
      .then((result) => {
        if (result.status === 200) {
          setSnackbarType('success')
          setSnackbarMessage('Anime updated successfully')
        } else {
          newAnime.persisted = false
          setSnackbarType('error')
          setSnackbarMessage('Error updating anime')
        }
      })
      .catch(() => {
        newAnime.persisted = false
        setSnackbarType('warning')
        setSnackbarMessage('Server is down, but anime updated locally')
      })
      .finally(() => {
        updateAnimeStore(newAnime)
        setSnackbarOpen(true)
      })
  }

  return handleSubmit
}

export default useEditAnime
