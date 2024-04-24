import axios from 'axios'
import Anime from '../data/Anime'

const REST_API_BASE_URL = 'http://localhost:8081/api/anime'

export const listAnime = async (page: number) => {
  const result = await axios.get(
    `${REST_API_BASE_URL}/getAllAnime?sort&page=${page}`
  )
  return result
}

export const addAnime = async (anime: Anime) => {
  const data = {
    title: anime.title,
    watched: anime.watched,
    score: anime.score,
  }
  const result = await axios.post(`${REST_API_BASE_URL}/addAnime`, data)
  return result
}

export const getAnime = async (animeId: number) => {
  const result = await axios.get(`${REST_API_BASE_URL}/getAnime/${animeId}`)
  return result
}

export const updateAnime = async (animeId: number, anime: Anime) => {
  const data = {
    title: anime.title,
    watched: anime.watched,
    score: anime.score,
  }
  const result = await axios.patch(
    `${REST_API_BASE_URL}/updateAnime/${animeId}`,
    data
  )
  return result
}

export const deleteAnime = async (animeId: number) => {
  const result = await axios.delete(
    `${REST_API_BASE_URL}/deleteAnime/${animeId}`
  )
  return result
}

export const getStatus = async () => {
  const result = await axios.get('http://localhost:8081/actuator/health')
  return result
}
