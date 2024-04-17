import axios from 'axios'
import Episode from '../data/Episode'

const REST_API_BASE_URL = 'http://localhost:8081/api/episode'

export const listEpisode = async () => {
    const result = await axios.get(`${REST_API_BASE_URL}/getAllEpisodes`)
    return result
}

export const addEpisode = async (episode: Episode) => {
    const result = await axios.post(`${REST_API_BASE_URL}/addEpisode`, episode)
    return result
}

export const getEpisode = async (episodeId: number) => {
    const result = await axios.get(`${REST_API_BASE_URL}/getEpisode/${episodeId}`)
    return result
}

export const updateEpisode = async (episodeId: number, episode: Episode) => {
    const result = await axios.patch(
        `${REST_API_BASE_URL}/updateEpisode/${episodeId}`,
        episode
    )
    return result
}

export const deleteEpisode = async (episodeId: number) => {
    const result = await axios.delete(
        `${REST_API_BASE_URL}/deleteEpisode/${episodeId}`
    )
    return result
}

export const getStatus = async () => {
    const result = await axios.get(`${REST_API_BASE_URL}/status`)
    return result
}
