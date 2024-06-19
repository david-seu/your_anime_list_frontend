import Graph from '../components/AnimeGraph'
import ExpandLinkButton from '../components/ExpandLinkButton'

export default function Stats() {
  return (
    <div>
      <ExpandLinkButton to="/home">Home</ExpandLinkButton>
      <h1>Stats</h1>
      <Graph />
    </div>
  )
}
