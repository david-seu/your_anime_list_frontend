import { startAnimeCreation } from '../services/AnimeService'
import useUserStore from '../store/useUserStore'

interface UseStartAnimeCreationProps {
  setSnackbarType: (type: string) => void
  setSnackbarMessage: (message: string) => void
  setSnackbarOpen: (open: boolean) => void
}

const useStartAnimeCreation = ({
  setSnackbarType,
  setSnackbarMessage,
  setSnackbarOpen,
}: UseStartAnimeCreationProps) => {
  const currentUser = useUserStore((state) => state.currentUser)

  const startAnimeCreationfunc = () => {
    if (!currentUser) return

    startAnimeCreation(currentUser.token)
      .then((response) => {
        if (response.status === 200) {
          setSnackbarType('success')
          setSnackbarMessage('Started anime creation successfully!')
          setSnackbarOpen(true)
        } else {
          setSnackbarType('error')
          setSnackbarMessage('Failed to start anime creation!')
          setSnackbarOpen(true)
        }
      })
      .catch((error) => {
        setSnackbarType('error')
        setSnackbarMessage(error.response.message)
        setSnackbarOpen(true)
      })
  }

  return startAnimeCreationfunc
}

export default useStartAnimeCreation
