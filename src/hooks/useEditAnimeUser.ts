import { SetStateAction, Dispatch } from 'react'
import useUserStore from '../store/useUserStore'
import AnimeUser from '../data/AnimeUser'
import useAnimeUserStore from '../store/useAnimeUserStore'
import { updateAnimeUser } from '../services/AnimeUserService'

interface UseEditAnimeUserProps {
  animeUser: AnimeUser
  setSnackbarOpen: Dispatch<SetStateAction<boolean>>
  setSnackbarType: Dispatch<SetStateAction<string>>
  setSnackbarMessage: Dispatch<SetStateAction<string>>
}

const useEditAnimeUser = ({
  animeUser,
  setSnackbarOpen,
  setSnackbarType,
  setSnackbarMessage,
}: UseEditAnimeUserProps) => {
  const updateAnimeUserStore = useAnimeUserStore((state) => state.updateAnime)
  const currentUser = useUserStore((state) => state.currentUser)!

  const handleSubmit = (): void => {
    if (!currentUser) return

    updateAnimeUserStore(animeUser)

    updateAnimeUser(animeUser, currentUser!.token)
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

export default useEditAnimeUser
