import BasicModal from './BasicModal'
import useNetworkStatus from '../hooks/useNetworkStatus'
import useServerStatus from '../hooks/useServerStatus'

export function NetworkStatusIndicator(): JSX.Element {
  const status = useNetworkStatus()
  return (
    <BasicModal buttonLabel="Network Status" title="Status" text={status} />
  )
}

export function ServerkStatusIndicator(): JSX.Element {
  const status = useServerStatus()

  return <BasicModal buttonLabel="Server Status" title="Status" text={status} />
}
