import { useState, useEffect } from 'react'
// eslint-disable-next-line import/no-named-as-default
import useAnimeStore from '../store/useAnimeStore'
import syncAnime from '../utils/syncAnime'
import { getStatus } from '../services/AnimeService'
// eslint-disable-next-line import/no-named-as-default
import useEpisodeStore from '../store/useEpisodeStore'
import syncEpisode from '../utils/syncEpisode'

const useServerStatus = () => {
  const [status, setStatus] = useState('')
  const getDirtyAnime = useAnimeStore((state) => state.getDirtyAnime)
  const getDirtyEpisode = useEpisodeStore((state) => state.getDirtyEpisode)

  useEffect(() => {
    const checkStatus = () => {
      getStatus()
        .then(() => {
          console.log(status)
          if (status === 'Offline') {
            syncAnime(getDirtyAnime())
            syncEpisode(getDirtyEpisode())
            setStatus('Online')
          } else {
            setStatus('Online')
          }
        })
        .catch((error) => {
          if (error.message === 'Network Error') {
            setStatus('Offline')
          } else {
            setStatus('Unknown')
          }
        })
    }

    checkStatus()
    const intervalId = setInterval(checkStatus, 10000)

    return () => {
      clearInterval(intervalId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return status
}

export default useServerStatus
