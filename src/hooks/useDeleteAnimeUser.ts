import { SetStateAction, Dispatch } from 'react'
import useUserStore from '../store/useUserStore'
import AnimeUser from '../data/AnimeUser'
import useAnimeUserStore from '../store/useAnimeUserStore'
import { deleteAnimeUser } from '../services/AnimeUserService'

interface UseDeleteAnimeUserProps {
  setSnackbarOpen: Dispatch<SetStateAction<boolean>>
  setSnackbarType: Dispatch<SetStateAction<string>>
  setSnackbarMessage: Dispatch<SetStateAction<string>>
}

const useDeleteAnimeUser = ({
  setSnackbarOpen,
  setSnackbarType,
  setSnackbarMessage,
}: UseDeleteAnimeUserProps) => {
  const deleteAnimeUserStore = useAnimeUserStore((state) => state.deleteAnime)
  const currentUser = useUserStore((state) => state.currentUser)!

  const handleSubmit = (animeUser: AnimeUser): void => {
    if (!currentUser) return

    deleteAnimeUserStore(animeUser.id)

    deleteAnimeUser(animeUser.animeId, animeUser.userId, currentUser!.token)
      .then((result) => {
        if (result.status === 200) {
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

export default useDeleteAnimeUser
