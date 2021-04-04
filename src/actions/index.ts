import delve from 'dlv';
import { Dispatch } from 'redux';

import { FIRST_PAGE_NUMBER, SUPPORTED_ENTITIES } from '../const';
import { IAction } from '../pages/GithubSearch/GithubSearcher.interfaces';
import { search } from '../services';
import {
  SEARCH_USERS_LOADING,
  SEARCH_USERS_DATA_SUCCESS,
  SEARCH_USERS_DATA_ERROR,
  SEARCH_REPO_LOADING,
  SEARCH_REPO_DATA_SUCCESS,
  SEARCH_REPO_DATA_ERROR
} from './action-types'

const {
  USERS,
  REPO
} = SUPPORTED_ENTITIES;

const initialPayload = {
  isLoading: false,
  page: FIRST_PAGE_NUMBER,
  appendToState: false,
  errorMessage: '',
  query: '',
  items: []
}

const searchUsers = (query: string) => {
  return async (dispatch: Dispatch<IAction>, getState: Function) => {
    const state = getState()
    const { items: cachedItems = [], page: cachedPage } = delve(state, `users.${query}`, {})

    if (cachedItems.length > 0) {
      dispatch({
        type: SEARCH_USERS_DATA_SUCCESS,
        payload: {
          items: cachedItems,
          page: cachedPage,
          query,
          appendToState: false,
          errorMessage: '',
          isLoading: false
        }
      });
    } else {
      dispatch({
        type: SEARCH_USERS_LOADING, payload: {
          ...initialPayload,
          isLoading: true
      } });
      try {
        const response = await search(query, USERS, FIRST_PAGE_NUMBER)
        dispatch({
          type: SEARCH_USERS_DATA_SUCCESS,
          payload: {
            ...initialPayload,
            items: response.data.items,
            page: FIRST_PAGE_NUMBER,
            query,
            appendToState: true
          }
        });
      } catch (errorMessage) {
        dispatch({
          type: SEARCH_USERS_DATA_ERROR, payload: {
            ...initialPayload,
            errorMessage
        } });
      }
    }
  };
}

const searchNextUsers = (query: string) => {
  return async (dispatch: Dispatch<IAction>, getState: Function) => {
    dispatch({
      type: SEARCH_USERS_LOADING, payload: {
        ...initialPayload,
        isLoading: true
    } })
    const { page } = delve(getState(), `users.${query}`, {})
    const newPage = page + 1

    try {
      const response = await search(query, USERS, newPage)
      dispatch({
        type: SEARCH_USERS_DATA_SUCCESS,
        payload: {
          ...initialPayload,
          items: response.data.items,
          page: newPage,
          query,
          appendToState: true
        }
      });
    } catch (errorMessage) {
      dispatch({
        type: SEARCH_USERS_DATA_ERROR, payload: {
          ...initialPayload,
          errorMessage
      } });
    }
  };
}

const searchRepo = (query: string) => {
  return async (dispatch: Dispatch<IAction>, getState: Function) => {
    const state = getState()
    const { items: cachedItems = [], page: cachedPage } = delve(state, `repos.${query}`, {})

    if (cachedItems.length > 0) {
      dispatch({
        type: SEARCH_REPO_DATA_SUCCESS,
        payload: {
          ...initialPayload,
          items: cachedItems,
          page: cachedPage,
          query,
          appendToState: false
        }
      });
    } else {
      dispatch({
        type: SEARCH_REPO_LOADING, payload: {
          ...initialPayload,
          isLoading: true
      } });
      try {
        const response = await search(query, REPO, FIRST_PAGE_NUMBER)
        dispatch({
          type: SEARCH_REPO_DATA_SUCCESS,
          payload: {
            ...initialPayload,
            items: response.data.items,
            page: FIRST_PAGE_NUMBER,
            query,
            appendToState: true
          }
        });
      } catch (errorMessage) {
        dispatch({
          type: SEARCH_REPO_DATA_ERROR, payload: {
            ...initialPayload,
            errorMessage
        } });
      }
    }
  };
}


const searchNextRepos = (query: string) => {
  return async (dispatch: Dispatch<IAction>, getState: Function) => {
    dispatch({
      type: SEARCH_REPO_LOADING, payload: {
        ...initialPayload,
        isLoading: false
      }
    })
    // could have delved page and initialized it to 0
    const { page } = delve(getState(), `repos.${query}`, {})
    const newPage = page + 1

    try {
      const response = await search(query, REPO, newPage)
      dispatch({
        type: SEARCH_REPO_DATA_SUCCESS,
        payload: {
          ...initialPayload,
          items: response.data.items,
          page: newPage,
          query,
          appendToState: true
        }
      });
    } catch (errorMessage) {
      dispatch({
        type: SEARCH_REPO_DATA_ERROR, payload: {
          ...initialPayload,
          errorMessage
      } });
    }
  };
}

export {
  searchUsers,
  searchNextUsers,
  searchRepo,
  searchNextRepos
}