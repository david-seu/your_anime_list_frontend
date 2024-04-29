import { Dispatch, SetStateAction } from 'react'
import { useEpisodeStore } from '../store/useEpisodeStore'
import { updateEpisode } from '../services/EpisodeService'
import Episode from '../data/Episode'

interface UseEditEpisodeProps {
  id: string
  title: string
  number: number
  season: number
  watched: boolean
  score: number
  animeTitle: string
  setSnackbarOpen: Dispatch<SetStateAction<boolean>>
  setSnackbarType: Dispatch<SetStateAction<string>>
  setSnackbarMessage: Dispatch<SetStateAction<string>>
}

const useEditEpisode = ({
  id,
  title,
  number,
  season,
  watched,
  score,
  animeTitle,
  setSnackbarOpen,
  setSnackbarType,
  setSnackbarMessage,
}: UseEditEpisodeProps) => {
  const updateEpisodeStore = useEpisodeStore((state) => state.updateEpisode)

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>): void => {
    e.preventDefault()

    const newEpisode: Episode = {
      id: Number(id),
      title,
      number,
      season,
      watched,
      score: Number(score),
      checked: false,
      animeTitle,
    }
    updateEpisodeStore(newEpisode)

    updateEpisode(Number(id), newEpisode)
      .then((result) => {
        if (result.status === 200) {
          setSnackbarType('success')
          setSnackbarMessage('Episode updated successfully')
        } else {
          setSnackbarType('error')
          setSnackbarMessage('Error updating episode')
        }
      })
      .catch(() => {
        setSnackbarType('warning')
        setSnackbarMessage('Server is down, but episode updated locally')
      })
      .finally(() => {
        setSnackbarOpen(true)
      })
  }

  return handleSubmit
}

export default useEditEpisode
