const SUPPORTED_ENTITIES: { [key: string]: string } = {
  USERS: 'USERS',
  REPO: 'REPO'
}

const API_SEARCH_KEYS: { [key: string]: string } = {
  USERS: 'users',
  REPO: 'repositories'
}

const FIRST_PAGE_NUMBER = 1;
const BASE_URL = 'https://api.github.com/search';

export {
  SUPPORTED_ENTITIES,
  API_SEARCH_KEYS,
  FIRST_PAGE_NUMBER,
  BASE_URL
}