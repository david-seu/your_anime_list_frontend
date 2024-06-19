import axios from 'axios'
import * as rax from 'retry-axios'
import Anime from '../data/Anime'
// eslint-disable-next-line import/no-extraneous-dependencies

const REST_API_BASE_URL = `${import.meta.env.VITE_REST_API_BASE_URL}/anime`

rax.attach()

export const fetchAnime = async (
  page = 0,
  sortDirection = 'desc',
  title = '',
  season: string | null = null,
  year: number | null = null,
  genres: string[] = [],
  tags: string[] = [],
  studios: string[] = [],
  type: string[] = [],
  status: string | null = null,
  orderBy: string | null = 'score'
) => {
  const result = await axios(`${REST_API_BASE_URL}/getAll`, {
    params: {
      page,
      sortDirection,
      title,
      season,
      year,
      genres,
      tags,
      studios,
      type,
      status,
      orderBy,
    },
    raxConfig: {
      retry: 100,
      noResponseRetries: 100,
      httpMethodsToRetry: ['GET', 'POST', 'PATCH', 'DELETE'],
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
    score: anime.score,
  }
  const result = await axios(`${REST_API_BASE_URL}/add`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
    raxConfig: {
      retry: 100,
      noResponseRetries: 100,
      httpMethodsToRetry: ['GET', 'POST', 'PATCH', 'DELETE'],
      retryDelay: 10000,
      onRetryAttempt: (err) => {
        const cfg = rax.getConfig(err)
        console.log(`Retry attempt #${cfg?.currentRetryAttempt}`)
      },
    },
  })

  return result
}

export const getAnime = async (animeId: number) => {
  const result = await axios(`${REST_API_BASE_URL}/get/${animeId}`, {
    raxConfig: {
      retry: 100,
      noResponseRetries: 100,
      httpMethodsToRetry: ['GET', 'POST', 'PATCH', 'DELETE'],
      retryDelay: 10000,
      onRetryAttempt: (err) => {
        const cfg = rax.getConfig(err)
        console.log(`Retry attempt #${cfg?.currentRetryAttempt}`)
      },
    },
  })
  return result
}

export const updateAnime = async (anime: Anime, token: string) => {
  const data = {
    title: anime.title,
    score: anime.score,
    user: anime.user,
  }
  const result = await axios(`${REST_API_BASE_URL}/update/${anime.id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
    raxConfig: {
      retry: 100,
      noResponseRetries: 100,
      httpMethodsToRetry: ['GET', 'POST', 'PATCH', 'DELETE'],
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
  const result = await axios(`${REST_API_BASE_URL}/delete/${animeId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    raxConfig: {
      retry: 100,
      noResponseRetries: 100,
      httpMethodsToRetry: ['GET', 'POST', 'PATCH', 'DELETE'],
      retryDelay: 10000,
      onRetryAttempt: (err) => {
        const cfg = rax.getConfig(err)
        console.log(`Retry attempt #${cfg?.currentRetryAttempt}`)
      },
    },
  })

  return result
}

export const fetchScoresCount = async (token: string) => {
  const result = await axios(`${REST_API_BASE_URL}/scoresCount`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    raxConfig: {
      retry: 100,
      noResponseRetries: 100,
      httpMethodsToRetry: ['GET', 'POST', 'PATCH', 'DELETE'],
      retryDelay: 10000,
      onRetryAttempt: (err) => {
        const cfg = rax.getConfig(err)
        console.log(`Retry attempt #${cfg?.currentRetryAttempt}`)
      },
    },
  })

  return result
}

export const startAnimeCreation = async (token: string) => {
  const result = await axios(`${REST_API_BASE_URL}/startCreation`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    raxConfig: {
      retry: 100,
      noResponseRetries: 100,
      httpMethodsToRetry: ['GET', 'POST', 'PATCH', 'DELETE'],
      retryDelay: 10000,
      onRetryAttempt: (err) => {
        const cfg = rax.getConfig(err)
        console.log(`Retry attempt #${cfg?.currentRetryAttempt}`)
      },
    },
  })

  return result
}

export const stopAnimeCreation = async (token: string) => {
  const result = await axios(`${REST_API_BASE_URL}/stopCreation`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    raxConfig: {
      retry: 100,
      noResponseRetries: 100,
      httpMethodsToRetry: ['GET', 'POST', 'PATCH', 'DELETE'],
      retryDelay: 10000,
      onRetryAttempt: (err) => {
        const cfg = rax.getConfig(err)
        console.log(`Retry attempt #${cfg?.currentRetryAttempt}`)
      },
    },
  })

  return result
}
