import axios from 'axios'
import User from '../data/User'

const REST_API_BASE_URL = 'http://localhost:8081/api/user'

export const addUser = async (user: User) => {
  const data = {
    username: user.username,
    password: user.password,
    email: user.email,
    fullName: user.fullName,
  }
  const result = await axios({
    url: `${REST_API_BASE_URL}/add`,
    method: 'POST',
    data,
  })
  return result
}

export const loginUser = async (username: string, password: string) => {
  const data = {
    username,
    password,
  }
  const result = await axios({
    url: `${REST_API_BASE_URL}/login`,
    method: 'POST',
    data,
  })
  return result
}
