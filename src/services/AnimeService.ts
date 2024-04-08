import axios from 'axios'
import Anime from '../data/Anime'

const REST_API_BASE_URL = 'http://localhost:8081/api/anime'

export const listAnime = async () => {
  const result = await axios.get(`${REST_API_BASE_URL}/getAllAnime`)
  return result
}

export const addAnime = async (anime: Anime) => {
  const result = await axios.post(`${REST_API_BASE_URL}/addAnime`, anime)
  return result
}

export const getAnime = async (animeId: number) => {
  const result = await axios.get(`${REST_API_BASE_URL}/getAnimeById/${animeId}`)
  return result
}

export const updateAnime = async (animeId: number, anime: Anime) => {
  const result = await axios.patch(
    `${REST_API_BASE_URL}/updateAnimeById/${animeId}`,
    anime
  )
  return result
}

export const deleteAnime = async (animeId: number) => {
  const result = await axios.delete(
    `${REST_API_BASE_URL}/deleteAnimeById/${animeId}`
  )
  return result
}

export const getStatus = async () => {
  const result = await axios.get(`${REST_API_BASE_URL}/status`)
  return result
}