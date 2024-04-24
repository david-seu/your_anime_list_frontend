import Anime from '../data/Anime'
import { addAnime, deleteAnime, updateAnime } from '../services/AnimeService'

const syncAnime = (animeList: Anime[]) => {
  animeList.forEach((anime) => {
    if (anime.checked) {
      deleteAnime(anime.id)
    } else if (anime.id === -1) {
      addAnime(anime)
    } else {
      updateAnime(anime.id, anime)
    }
    // eslint-disable-next-line no-param-reassign
    anime.persisted = true
  })
}

export default syncAnime
