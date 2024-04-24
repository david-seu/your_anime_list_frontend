import Episode from '../data/Episode'
import {
  addEpisode,
  deleteEpisode,
  updateEpisode,
} from '../services/EpisodeService'

const syncEpisode = (episodeList: Episode[]) => {
  episodeList.forEach((episode) => {
    if (episode.checked) {
      deleteEpisode(episode.id)
    } else if (episode.id === -1) {
      addEpisode(episode)
    } else {
      updateEpisode(episode.id, episode)
    }
    // eslint-disable-next-line no-param-reassign
    episode.persisted = true
  })
}

export default syncEpisode
