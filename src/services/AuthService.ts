import axios from 'axios'
import User from '../data/User'

const REST_API_BASE_URL = 'http://localhost:8081/api/auth'

// const REST_API_BASE_URL =
//   'https://mpp-david-spring-app-20240515142023.azuremicroservices.io/api/auth'

export const signup = async (user: User) => {
  const data = {
    username: user.username,
    password: user.password,
    email: user.email,
    enabled: false,
    role: '`user`',
  }
  const result = await axios({
    url: `${REST_API_BASE_URL}/signUp`,
    method: 'POST',
    data,
  })
  return result
}

export const signin = async (username: string, password: string) => {
  const data = {
    username,
    password,
  }
  const result = await axios({
    url: `${REST_API_BASE_URL}/signIn`,
    method: 'POST',
    data,
  })
  return result
}

export const confirmRegister = async (token: string) => {
  const result = await axios({
    url: `${REST_API_BASE_URL}/signUp/confirm?token=${token}`,
    method: 'GET',
  })
  return result
}

export const confirmLogin = async (code: number) => {
  const result = await axios({
    url: `${REST_API_BASE_URL}/signIn/confirm?code=${code}`,
    method: 'GET',
  })
  return result
}
