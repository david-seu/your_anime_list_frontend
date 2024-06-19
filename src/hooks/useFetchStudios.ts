import Studio from '../data/Studio'
import fetchStudios from '../services/StudioService'
import useStudioStore from '../store/useStudioStore'

interface UseFetchStudiosProp {
  setSnackbarType: (type: string) => void
  setSnackbarMessage: (message: string) => void
  setSnackbarOpen: (open: boolean) => void
}

const useFetchStudios = ({
  setSnackbarType,
  setSnackbarMessage,
  setSnackbarOpen,
}: UseFetchStudiosProp) => {
  const setStudio = useStudioStore((state) => state.setStudio)

  const getStudios = () => {
    fetchStudios()
      .then((result: { data: Studio[]; status: number }) => {
        if (result.status === 200) {
          setStudio(result.data)
        }
      })
      .catch((error: { message: string }) => {
        setSnackbarMessage(error.message)
        setSnackbarType('error')
        setSnackbarOpen(true)
      })
  }
  return getStudios
}

export default useFetchStudios
