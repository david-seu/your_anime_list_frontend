import { useEffect, useState } from 'react'
import useNavigatorOnLine from './useNavigatorOnline'
import syncAnime from '../utils/syncAnime'
import syncEpisode from '../utils/syncEpisode'
// eslint-disable-next-line import/no-named-as-default
import useAnimeStore from '../store/useAnimeStore'
// eslint-disable-next-line import/no-named-as-default
import useEpisodeStore from '../store/useEpisodeStore'

const useNetworkStatus = () => {
  const isOnline = useNavigatorOnLine()
  const [status, setStatus] = useState('')

  const animeList = useAnimeStore((state) => state.animeList)
  const episodeList = useEpisodeStore((state) => state.episodeList)

  useEffect(() => {
    const checkStatus = () => {
      if (isOnline && status === 'Offline') {
        setStatus('Online')
      } else {
        setStatus('Offline')
      }
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

export default useNetworkStatus
