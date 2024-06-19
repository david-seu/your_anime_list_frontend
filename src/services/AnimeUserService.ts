import axios from 'axios'
import * as rax from 'retry-axios'
import AnimeUser from '../data/AnimeUser'
// eslint-disable-next-line import/no-extraneous-dependencies

const REST_API_BASE_URL = `${import.meta.env.VITE_REST_API_BASE_URL}/animeUser`

rax.attach()

export const fetchAnimeUser = async (
  page: number,
  id: number,
  token: string,
  title: string,
  sort: string
) => {
  const result = await axios(`${REST_API_BASE_URL}/getAll/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page,
      title,
      sort,
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

export const addAnimeUser = async (animeUser: AnimeUser, token: string) => {
  const data = {
    animeId: animeUser.animeId,
    userId: animeUser.userId,
    score: animeUser.score,
    isFavorite: animeUser.isFavorite,
    status: animeUser.status,
    startDate: animeUser.startDate,
    endDate: animeUser.endDate,
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

export const getAnimeUser = async (
  animeId: number,
  userId: number,
  token: string
) => {
  const result = await axios(`${REST_API_BASE_URL}/get/${animeId}/${userId}`, {
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

export const updateAnimeUser = async (animeUser: AnimeUser, token: string) => {
  const data = {
    animeId: animeUser.animeId,
    userId: animeUser.userId,
    score: animeUser.score,
    isFavorite: animeUser.isFavorite,
    status: animeUser.status,
    startDate: animeUser.startDate,
    endDate: animeUser.endDate,
  }
  const result = await axios(
    `${REST_API_BASE_URL}/update/${animeUser.animeId}/${animeUser.userId}`,
    {
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
    }
  )

  return result
}

export const deleteAnimeUser = async (
  animeId: number,
  userId: number,
  token: string
) => {
  const result = await axios(
    `${REST_API_BASE_URL}/delete/${animeId}/${userId}`,
    {
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
    }
  )

  return result
}
