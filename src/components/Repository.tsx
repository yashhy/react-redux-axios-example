import { Flex, Box } from 'rebass';

import { IRepository } from '../pages/GithubSearch/GithubSearcher.interfaces';
import { GridContainer } from './Layout/GridLayout';

const Repository = (props: { repository: IRepository }) => {
  const { repository: {
    fullName,
    htmlUrl,
    description,
    stargazersCount,
    forks,
    openIssues,
    language,
  } } = props;

  return (
    <GridContainer>
      <Flex flexDirection="column" pl={3}>
        <Box>
          <b>Repo Name:</b> {fullName} <br/>
          <b>Description:</b> {description} <br/>
          <b>Language:</b> {language} <br/><br/>
        </Box>
        <Box>
          ⭐️ {stargazersCount} ⎪ 🍴 {forks} ⎪ 🐞 {openIssues} <br/><br/>
        </Box>
        <Box>
          Click <a href={htmlUrl} target="_blank" rel="noreferrer noopener">here</a> to go to repo
        </Box>
      </Flex>
    </GridContainer>
  )
}

export default Repository