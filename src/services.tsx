import axios from 'axios'
import humps from 'humps'

import { API_SEARCH_KEYS, BASE_URL } from './const'
import { logger } from './utility';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'content-type': 'application/json',
  }
})

axiosInstance.interceptors.request.use(config => {
  if (config.data) {
    config.data = humps.decamelizeKeys(config.data)
  }
  return config
})

axiosInstance.interceptors.response.use(response => {
  response.data = humps.camelizeKeys(response.data)
  return response
}, (error) => {
    const { response } = error;
    logger.log('Error :', {
      status: response.status,
      message: response.data.message
    })
  return Promise.reject(response.data.message);
})

const search = async (query: string, entity: string, page: number) => {
  try {
    const response = await axiosInstance({
      method: 'get',
      url: `${API_SEARCH_KEYS[entity]}?per_page=9&page=${page}&q=${query}`
    })

    return response;
  } catch (error) {
    throw error;
  }
}

export {
  search
}