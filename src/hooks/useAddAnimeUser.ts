/* eslint-disable no-param-reassign */
import { SetStateAction, Dispatch } from 'react'
import useUserStore from '../store/useUserStore'
import AnimeUser from '../data/AnimeUser'
import { addAnimeUser } from '../services/AnimeUserService'
import formatDate from '../utils/formatDate'

interface UseAddAnimeUserProps {
  animeUser: AnimeUser
  setSnackbarOpen: Dispatch<SetStateAction<boolean>>
  setSnackbarType: Dispatch<SetStateAction<string>>
  setSnackbarMessage: Dispatch<SetStateAction<string>>
}

const useAddAnimeUser = ({
  animeUser,
  setSnackbarOpen,
  setSnackbarType,
  setSnackbarMessage,
}: UseAddAnimeUserProps) => {
  const currentUser = useUserStore((state) => state.currentUser)!

  const handleSubmit = (): void => {
    if (!currentUser) return

    animeUser.startDate = formatDate(animeUser.startDate! as Date)
    animeUser.endDate = formatDate(animeUser.endDate! as Date)

    console.log('animeUser', animeUser)

    addAnimeUser(animeUser, currentUser!.token)
      .then((result) => {
        if (result.status === 201) {
          setSnackbarType('success')
          setSnackbarMessage('Anime added successfully')
        } else {
          setSnackbarType('error')
          setSnackbarMessage('Error adding anime')
          console.error(result.data)
        }
      })
      .catch((e) => {
        setSnackbarType('warning')
        setSnackbarMessage('Server is down, but anime added locally')
        console.error(e)
      })
      .finally(() => {
        setSnackbarOpen(true)
      })
  }

  return handleSubmit
}

export default useAddAnimeUser
