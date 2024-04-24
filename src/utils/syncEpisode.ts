import Episode from '../data/Episode'
import {
  addEpisode,
  deleteEpisode,
  updateEpisode,
} from '../services/EpisodeService'

const syncEpisode = (episodeList: Episode[]) => {
  console.log(episodeList)
  episodeList.forEach((episode) => {
    if (episode.checked) {
      console.log('Deleting episode')
      deleteEpisode(episode.id)
    } else if (episode.id === -1) {
      console.log('Add Episode')
      addEpisode(episode)
    } else {
      console.log('Updating episode')
      updateEpisode(episode.id, episode)
    }
    // eslint-disable-next-line no-param-reassign
    episode.persisted = true
  })
}

export default syncEpisode
