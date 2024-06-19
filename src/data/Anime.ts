import User from './User'

interface Anime {
  id: number
  title: string
  synopsis: string
  score: number
  type: string
  nrEpisodes: number
  status: string
  animeSeason: {
    season: string
    year: number
  }
  pictureURL: string
  thumbnailURL: string
  startDate: string
  endDate: string
  popularity: number
  completed: number
  watching: number
  onHold: number
  dropped: number
  planToWatch: number
  genres: string[]
  tags: string[]
  studios: string[]
  synonyms: string[]
  relatedAnime: Anime[]
  recommendations: Anime[]
  checked: boolean
  malId: number
  user: User | null
}

export default Anime
