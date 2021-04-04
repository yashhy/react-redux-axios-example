import React from 'react'
import { Flex, Box } from 'rebass'
import styled from '@emotion/styled'

const Heading = styled('h2')`
  margin: 0;
`

const SubHeading = styled('span')`
  color: #878787;
  font-size: 14px;
  font-weight: 500;
`;

const Image = styled('img')`
  width: 50px;
  height: 50px;
`

const GithubHeader = () => (
  <Flex alignItems="center">
    <Image
      alt="Github Logo"
      src="./images/github.png"/>
    <Box pl={3}>
      <Heading>GitHub Searcher</Heading>
      <SubHeading>
        Search users or repositories below
      </SubHeading>
    </Box>
  </Flex>
)

export default GithubHeader;