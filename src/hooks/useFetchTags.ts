import Tag from '../data/Tag'
import fetchTags from '../services/TagService'
import useTagStore from '../store/useTagsStore'

interface UseFetchTagsProp {
  setSnackbarType: (type: string) => void
  setSnackbarMessage: (message: string) => void
  setSnackbarOpen: (open: boolean) => void
}

const useFetchTags = ({
  setSnackbarType,
  setSnackbarMessage,
  setSnackbarOpen,
}: UseFetchTagsProp) => {
  const setTags = useTagStore((state) => state.setTags)

  const getTags = () => {
    fetchTags()
      .then((result: { data: Tag[]; status: number }) => {
        if (result.status === 200) {
          setTags(result.data)
        }
      })
      .catch((error: { message: string }) => {
        setSnackbarMessage(error.message)
        setSnackbarType('error')
        setSnackbarOpen(true)
      })
  }
  return getTags
}

export default useFetchTags
