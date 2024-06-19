import axios from 'axios'
import * as rax from 'retry-axios'
// eslint-disable-next-line import/no-extraneous-dependencies

const REST_API_BASE_URL = `${import.meta.env.VITE_REST_API_BASE_URL}/tag`

rax.attach()

export const fetchTags = async () => {
  const result = await axios(`${REST_API_BASE_URL}/all`, {
    method: 'GET',
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

export default fetchTags
