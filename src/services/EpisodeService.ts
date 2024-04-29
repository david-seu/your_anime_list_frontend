import axios from 'axios'
import * as rax from 'retry-axios'
import Episode from '../data/Episode'

const REST_API_BASE_URL = 'http://localhost:8081/api/episode'

rax.attach()

export const listEpisode = async (page: number) => {
  const result = await axios({
    url: `${REST_API_BASE_URL}/getAllEpisodes?page=${page}`,
    method: 'GET',
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

export const addEpisode = async (episode: Episode) => {
  const data = {
    title: episode.title,
    number: episode.number,
    season: episode.season,
    score: episode.score,
    watched: episode.watched,
    animeTitle: episode.animeTitle,
  }
  const result = await axios({
    url: `${REST_API_BASE_URL}/addEpisode`,
    method: 'POST',
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

export const getEpisode = async (episodeId: number) => {
  const result = await axios({
    url: `${REST_API_BASE_URL}/getEpisode/${episodeId}`,
    method: 'GET',
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

export const updateEpisode = async (episodeId: number, episode: Episode) => {
  const data = {
    title: episode.title,
    number: episode.number,
    season: episode.season,
    score: episode.score,
    watched: episode.watched,
    animeTitle: episode.animeTitle,
  }
  const result = await axios({
    url: `${REST_API_BASE_URL}/updateEpisode/${episodeId}`,
    method: 'PUT',
    data,
    raxConfig: {
      retry: 100,
      noResponseRetries: 100,
      httpMethodsToRetry: ['PUT'],
      retryDelay: 10000,
      onRetryAttempt: (err) => {
        const cfg = rax.getConfig(err)
        console.log(`Retry attempt #${cfg?.currentRetryAttempt}`)
      },
    },
  })
  return result
}

export const deleteEpisode = async (episodeId: number) => {
  const result = await axios({
    method: 'DELETE',
    url: `${REST_API_BASE_URL}/deleteEpisode/${episodeId}`,
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
