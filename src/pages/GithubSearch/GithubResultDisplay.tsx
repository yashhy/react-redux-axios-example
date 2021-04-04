import InfiniteScroll from "react-infinite-scroll-component";

import { IUser, IRepository } from './GithubSearcher.interfaces';
import User from '../../components/User';
import Repository from '../../components/Repository';

import { SUPPORTED_ENTITIES } from '../../const';
import { gridLayoutClass } from '../../components/Layout';

declare type Fn = () => any;

const {
  USERS,
  REPO
} = SUPPORTED_ENTITIES

interface IGithubResultDisplayProps {
  entity: string;
  onLoadMore: Fn;
  userList: IUser[];
  repoList: IRepository[];
  isLoading: boolean;
}

const GithubResultDisplay = ({
  entity,
  onLoadMore,
  userList,
  repoList,
  isLoading
}: IGithubResultDisplayProps) => {
  const resultLength = entity === USERS ? userList.length : repoList.length;

  if (!isLoading && resultLength === 0) {
    return <h3>No results found 🔍</h3>;
  }

  return (
    <InfiniteScroll
      className={gridLayoutClass}
      height={400}
      dataLength={resultLength}
      next={onLoadMore}
      hasMore={true}
      loader={<h2 key={0}>Loading ...</h2>}
    >
      {
        entity === USERS && userList.map((user: IUser) => <User key={user.id} user={user} />)
      }
      {
        entity === REPO && repoList.map((repo: IRepository) => <Repository key={repo.id} repository={repo} />)
      }
    </InfiniteScroll>
  )
}
export default GithubResultDisplay