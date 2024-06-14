import { startAnimeCreation as stopAnimeCreation } from '../services/AnimeService'
import useUserStore from '../store/useUserStore'

interface UseStopAnimeCreationProps {
  setSnackbarType: (type: string) => void
  setSnackbarMessage: (message: string) => void
  setSnackbarOpen: (open: boolean) => void
}

const useStopAnimeCreation = ({
  setSnackbarType,
  setSnackbarMessage,
  setSnackbarOpen,
}: UseStopAnimeCreationProps) => {
  const currentUser = useUserStore((state) => state.currentUser)

  const stopAnimeCreationfunc = () => {
    if (!currentUser) return

    stopAnimeCreation(currentUser.token)
      .then((response) => {
        if (response.status === 200) {
          setSnackbarType('success')
          setSnackbarMessage('Stopped anime creation successfully!')
          setSnackbarOpen(true)
        } else {
          setSnackbarType('error')
          setSnackbarMessage('Failed to stop anime creation!')
          setSnackbarOpen(true)
        }
      })
      .catch((error) => {
        setSnackbarType('error')
        setSnackbarMessage(error.response.message)
        setSnackbarOpen(true)
      })
  }

  return stopAnimeCreationfunc
}

export default useStopAnimeCreation
