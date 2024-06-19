import Anime from './Anime'
import User from './User'

interface AnimeUser {
  id: number
  animeId: number
  userId: number
  anime: Anime | null
  user: User | null

  score: number
  isFavorite: boolean
  status: string

  startDate: Date | string | null
  endDate: Date | string | null
}

export default AnimeUser
