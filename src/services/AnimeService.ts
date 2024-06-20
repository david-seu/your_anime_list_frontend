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
    synopsis: anime.synopsis,
    score: anime.score,
    popularity: anime.popularity,
    nrEpisodes: anime.nrEpisodes,
    pictureURL: anime.pictureURL,
    thumbnailURL: anime.thumbnailURL,
    startDate: anime.startDate,
    endDate: anime.endDate,
    watching: anime.watching,
    completed: anime.completed,
    onHold: anime.onHold,
    dropped: anime.dropped,
    planToWatch: anime.planToWatch,
    tags: anime.tags,
    genres: anime.genres,
    studios: anime.studios,
    synonyms: anime.synonyms,
    relatedAnime: anime.relatedAnime,
    recommendations: anime.recommendations,
    user: anime.user,
    type: anime.type,
    status: anime.status,
    animeSeason: anime.animeSeason,
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
    synopsis: anime.synopsis,
    nrEpisodes: anime.nrEpisodes,
    pictureURL: anime.pictureURL,
    thumbnailURL: anime.thumbnailURL,
    startDate: anime.startDate,
    endDate: anime.endDate,
    type: anime.type,
    status: anime.status,
    tags: anime.tags,
    genres: anime.genres,
    studios: anime.studios,
    animeSeason: anime.animeSeason,
  }
  console.log('Data:', data)
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

export const getRecommendations = async (title: string) => {
  const result = await axios(`${REST_API_BASE_URL}/recommend?title=${title}`, {
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
