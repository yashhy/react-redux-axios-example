import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import delve from 'dlv';

import {
  SEARCH_USERS_LOADING,
  SEARCH_USERS_DATA_SUCCESS,
  SEARCH_USERS_DATA_ERROR,
  SEARCH_REPO_LOADING,
  SEARCH_REPO_DATA_SUCCESS,
  SEARCH_REPO_DATA_ERROR
} from '../actions/action-types';
import { FIRST_PAGE_NUMBER } from '../const';
import { IGenericResults } from '../pages/GithubSearch/GithubSearcher.interfaces';
import { AnyAction } from 'redux';

interface IState {
  users: IGenericResults;
  repos: IGenericResults;
  isLoading: boolean;
  errorMessage: string;
  page: number;
  appendToState: boolean;
}

export const initialState = {
  users: {} as IGenericResults,
  repos: {} as IGenericResults,
  isLoading: false,
  errorMessage: '',
  page: FIRST_PAGE_NUMBER,
  appendToState: false
}

const rootReducer = (state: IState | undefined, action: AnyAction) => {
  const { payload, type } = action
  const { query, items, page, appendToState, errorMessage } = payload || {}
  if (state === undefined) {
    return initialState;
  }

  switch (type) {
    case SEARCH_USERS_LOADING:
      return {
        ...state,
        isLoading: true,
        errorMessage: ''
      }

    case SEARCH_USERS_DATA_SUCCESS:
      let updatedStateUsers = {...state.users};

      if (appendToState) {
        const existingState = delve(state, `users.${query}.items`, []);
        updatedStateUsers = {
          ...updatedStateUsers,
          ...{
            [query]: {
              items: [...existingState, ...items],
              page
            }
          }
        }
      }

      return {
        ...state,
        users: updatedStateUsers,
        isLoading: false,
        errorMessage: ''
      }

    case SEARCH_USERS_DATA_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage
      }

    case SEARCH_REPO_LOADING:
      return {
        ...state,
        isLoading: true,
        errorMessage: ''
      }

    case SEARCH_REPO_DATA_SUCCESS:
      let updatedStateRepos = {...state.repos};

      if (appendToState) {
        const existingState = delve(state, `repos.${query}.items`, []);
        updatedStateRepos = {
          ...updatedStateRepos,
          ...{
            [query]: {
              items: [...existingState, ...items],
              page
            }
          }
        }
      }
      return {
        ...state,
        repos: updatedStateRepos,
        isLoading: false,
        errorMessage: ''
      }

    case SEARCH_REPO_DATA_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage
      }

    default:
      return initialState;
  }
}

const persistConfig = {
  key: 'root',
  storage
}

export default persistReducer(persistConfig, rootReducer);