import axios from 'axios'
import * as rax from 'retry-axios'
import Anime from '../data/Anime'

// const REST_API_BASE_URL = 'http://localhost:8081/api/anime'
const REST_API_BASE_URL =
  'https://mpp-david-spring-app-20240515142023.azuremicroservices.io/api/anime'

rax.attach()

export const listAnime = async (page: number, token: string) => {
  const result = await axios({
    url: `${REST_API_BASE_URL}/getAllAnime?sort&page=${page}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    raxConfig: {
      retry: 100,
      noResponseRetries: 100,
      httpMethodsToRetry: ['GET'],
      retryDelay: 10000,
      onRetryAttempt: (err) => {
        const cfg = rax.getConfig(err)
        console.log(`Retry attempt #${cfg?.currentRetryAttempt}`)
      },
    },
  })
  return result
}

export const addAnime = async (anime: Anime, token: string) => {
  const data = {
    title: anime.title,
    watched: anime.watched,
    score: anime.score,
  }
  console.log(data)
  const result = await axios({
    url: `${REST_API_BASE_URL}/addAnime`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
    raxConfig: {
      retry: 100,
      noResponseRetries: 100,
      httpMethodsToRetry: ['POST'],
      retryDelay: 10000,
      onRetryAttempt: (err) => {
        const cfg = rax.getConfig(err)
        console.log(`Retry attempt #${cfg?.currentRetryAttempt}`)
      },
    },
  })

  return result
}

export const getAnime = async (animeId: number, token: string) => {
  const result = await axios({
    url: `${REST_API_BASE_URL}/getAnime/${animeId}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    raxConfig: {
      retry: 100,
      noResponseRetries: 100,
      httpMethodsToRetry: ['GET'],
      retryDelay: 10000,
      onRetryAttempt: (err) => {
        const cfg = rax.getConfig(err)
        console.log(`Retry attempt #${cfg?.currentRetryAttempt}`)
      },
    },
  })

  return result
}

export const updateAnime = async (
  animeId: number,
  anime: Anime,
  token: string
) => {
  const data = {
    title: anime.title,
    watched: anime.watched,
    score: anime.score,
  }
  const result = await axios({
    url: `${REST_API_BASE_URL}/updateAnime/${animeId}`,
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
    raxConfig: {
      retry: 100,
      noResponseRetries: 100,
      httpMethodsToRetry: ['PATCH'],
      retryDelay: 10000,
      onRetryAttempt: (err) => {
        const cfg = rax.getConfig(err)
        console.log(`Retry attempt #${cfg?.currentRetryAttempt}`)
      },
    },
  })

  return result
}

export const deleteAnime = async (animeId: number, token: string) => {
  const result = await axios({
    url: `${REST_API_BASE_URL}/deleteAnime/${animeId}`,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    raxConfig: {
      retry: 100,
      noResponseRetries: 100,
      httpMethodsToRetry: ['DELETE'],
      retryDelay: 10000,
      onRetryAttempt: (err) => {
        const cfg = rax.getConfig(err)
        console.log(`Retry attempt #${cfg?.currentRetryAttempt}`)
      },
    },
  })

  return result
}
