import axios from 'axios'

/** Default config for axios instance */
const config = {
  baseURL: process.env.CRAWL_FLIGHT_API,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
}

/** Creating the instance for axios */
const httpClient = axios.create(config)

/** Auth token interceptors */
const authInterceptor = (config) => {
  /** TODO: Add auth token */
  return config
}

/** logger interceptors */
const loggerInterceptor = (config) => {
  /** TODO */
  return config
}

/** Adding the request interceptors */
httpClient.interceptors.request.use(authInterceptor)
httpClient.interceptors.request.use(loggerInterceptor)

/** Adding the response interceptors */
httpClient.interceptors.response.use(
  (response) => {
    /** TODO: Add any response interceptors */
    return response
  },
  (error) => {
    /** TODO: Do something with response error */
    return Promise.reject(error)
  }
)

export { httpClient }
