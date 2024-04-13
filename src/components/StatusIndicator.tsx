import { useEffect, useState } from 'react'
import useNavigatorOnLine from '../hooks/useNavigatorOnline'
import BasicModal from './BasicModal'
import { getStatus } from '../services/AnimeService'

// eslint-disable-next-line import/prefer-default-export
export function NetworkStatusIndicator(): JSX.Element {
  const isOnline = useNavigatorOnLine()
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (isOnline) {
      setStatus(`You are online`)
    } else {
      setStatus(`You are offline :(`)
    }
  }, [isOnline])

  return (
    <BasicModal buttonLabel="Network Status" title="Status" text={status} />
  )
}

export function ServerkStatusIndicator(): JSX.Element {
  const [status, setStatus] = useState('')

  useEffect(() => {
    getStatus()
      .then(() => {
        setStatus('Server is up')
      })
      .catch((error) => {
        if (error.message === 'Network Error') {
          setStatus('Server is down')
        } else {
          setStatus('Unknown error')
        }
      })
  }, [])

  return <BasicModal buttonLabel="Server Status" title="Status" text={status} />
}
