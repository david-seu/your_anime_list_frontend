import { SetStateAction, Dispatch } from 'react'
import Anime from '../data/Anime'
import { useAnimeStore } from '../store/useAnimeStore'
import { addAnime } from '../services/AnimeService'
import User from '../data/User'

interface UseAddAnimeProps {
  user: User
  title: string
  score: number
  watched: boolean
  setSnackbarOpen: Dispatch<SetStateAction<boolean>>
  setSnackbarType: Dispatch<SetStateAction<string>>
  setSnackbarMessage: Dispatch<SetStateAction<string>>
}

const useAddAnime = ({
  user,
  title,
  score,
  watched,
  setSnackbarOpen,
  setSnackbarType,
  setSnackbarMessage,
}: UseAddAnimeProps) => {
  const addAnimeStore = useAnimeStore((state) => state.addAnime)

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (!user) return

    const id = -1

    const newAnime: Anime = {
      id,
      title,
      watched,
      score,
      checked: false,
      numEpisodes: 0,
    }
    addAnimeStore(newAnime)
    addAnime(newAnime, user!.token)
      .then((result) => {
        if (result.status !== 201) {
          setSnackbarType('error')
          setSnackbarMessage('Failed to add anime')
        } else {
          setSnackbarType('success')
          setSnackbarMessage('Successfully added anime')
        }
      })
      .catch(() => {
        setSnackbarType('warning')
        setSnackbarMessage('Server is down, but anime added locally')
      })
      .finally(() => {
        setSnackbarOpen(true)
      })
  }

  return handleSubmit
}

export default useAddAnime
