import { useEffect, useState, ChangeEvent } from 'react'
import { connect } from 'react-redux'
import { Flex } from 'rebass'
import styled from '@emotion/styled'
import { css } from '@emotion/css';
import delve from 'dlv';
import { Link } from 'react-router-dom';

import { SUPPORTED_ENTITIES } from '../../const'
import {
  searchUsers,
  searchNextUsers,
  searchRepo,
  searchNextRepos
} from '../../actions'
import { IUser, IRepository } from './GithubSearcher.interfaces'
import GithubResultDisplay from './GithubResultDisplay'

import GithubHeader from './GithubHeader';
import GithubSearchInput from './GithubSearchInput';

const {
  USERS,
  REPO
} = SUPPORTED_ENTITIES

interface ISearchResultUsers {
  [k: string]: {
    items: IUser[];
  }
}

interface ISearchResultRepo {
  [k: string]: {
    items: IRepository[];
  }
}

interface IGithubSearchProps {
  searchUsers?: Function;
  searchNextUsers?: Function;
  searchRepo?: Function;
  searchNextRepos?: Function;
  users?: ISearchResultUsers;
  repos?: ISearchResultRepo;
  isLoading?: boolean;
  errorMessage?: string;
}

interface ISearchContainerProps {
  hasInputValue: boolean;
}

const SearchContainer = styled(Flex)<ISearchContainerProps>`
  height: 80vh;
  justify-content: ${props => props.hasInputValue ? 'initial' : 'center'}
`

const Search = styled(Flex)`
  width: 450px;
`;

const Error = styled('div')`
  color: red;
  font-weight: bold;
`

const corner = css`
  position: absolute;
  right: 25px;
  bottom: 25px;
`;

const GithubSearch = (props: IGithubSearchProps) => {
  const {
    users = {},
    repos = {},
    searchUsers = () => {},
    searchNextUsers = () => {},
    searchRepo = () => {},
    searchNextRepos = () => {},
    errorMessage = '',
    isLoading = false
  } = props;

  const [selectedEntity, setSelectedEntity] = useState<string>(USERS);
  const [query, setQuery] = useState<string>('');

  const userList = delve(users, `${query}.items`, []);
  const repoList = delve(repos, `${query}.items`, []);

  // call whenever the entity or search term changes
  useEffect(() => {
    if (!query) {
      return;
    }

    const fetchData = () => {
      if (selectedEntity === USERS) {
        searchUsers(query)
      } else if (selectedEntity === REPO) {
        searchRepo(query)
      }
    }
    fetchData();
  }, [selectedEntity, query])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    if (!query) {
      setQuery('');
      return;
    }
    setQuery(query)
  }

  const handleEntityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const entity = e.target.value;
    setSelectedEntity(entity)
  }

  const handleNextPageLoad = () => {
    if (selectedEntity === USERS) {
      searchNextUsers(query);
    } else if (selectedEntity === REPO) {
      searchNextRepos(query)
    }
  }

  return (
    <SearchContainer
      flexDirection="column"
      hasInputValue={query.length !== 0}>
      <Search flexDirection="column">
        <GithubHeader />
        <GithubSearchInput
          selectedEntity={selectedEntity}
          onInputChange={handleInputChange}
          onEntityChange={handleEntityChange}
        />
      </Search>
      {
        isLoading && (
          userList.length === 0 && repoList.length === 0 &&
          <h2>Searching...</h2>
        )
      }
      {
        query &&
        !errorMessage &&
        <Flex mt={3}>
          <GithubResultDisplay
            isLoading={isLoading}
            entity={selectedEntity}
            onLoadMore={handleNextPageLoad}
            userList={userList}
            repoList={repoList}/>
        </Flex>
      }
      {
        query &&
        errorMessage &&
        <Flex mt={3}>
          <Error>
            {errorMessage}
          </Error>
        </Flex>
      }
      <Link to="/💣" className={corner}>💣</Link>
    </SearchContainer>
  );
}


const mapDispatchToProps = (dispatch: any) => {
  return {
    searchUsers: (term: any) => dispatch(searchUsers(term)),
    searchNextUsers: (query: string) => dispatch(searchNextUsers(query)),
    searchRepo: (term: any) => dispatch(searchRepo(term)),
    searchNextRepos: (query: string) => dispatch(searchNextRepos(query)),
  }
}
const mapStateToProps = (state: any) => state

const GithubSearchConnected = connect(mapStateToProps, mapDispatchToProps)(GithubSearch)
export default GithubSearchConnected