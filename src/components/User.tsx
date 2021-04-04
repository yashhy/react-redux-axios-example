import styled from '@emotion/styled'
import { Flex, Box } from 'rebass';

import { IUser } from '../pages/GithubSearch/GithubSearcher.interfaces';
import Anchor from './Anchor';
import { GridContainer } from './Layout/GridLayout';

const Image = styled('img')`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid gray;
`

const User = (props: { user: IUser }) => {
  const { user } = props;

  return (
    <GridContainer>
      <Image alt="User Avatar" src={user.avatarUrl} />
      <Flex flexDirection="column" pl={3}>
        <Box>
          <b>Name: </b>{user.login} <br/>
          <b>Followers: </b> <Anchor href={`https://github.com/${user.login}?tab=followers`}>here</Anchor><br/>
          <b>Repos: </b> <Anchor href={`https://github.com/${user.login}?tab=repositories`}>here</Anchor><br/><br/>
        </Box>
        <Box>
          Click <Anchor href={user.htmlUrl}>here</Anchor> to go to user's profile
        </Box>
        <Box>
          More info <Anchor href={user.url}>here</Anchor> for geeks 🤓
        </Box>
      </Flex>
    </GridContainer>
  )
}

export default User