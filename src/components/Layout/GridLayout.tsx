import styled from '@emotion/styled'
import { css } from '@emotion/css'
import { Flex } from 'rebass';

const gridLayoutClass = css`
  overflow: auto;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: auto auto auto;
  padding: 10px;

  @media screen and (max-width: 768px) {
    grid-template-columns: auto auto;
  }
`

const GridContainer = styled(Flex)`
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 10px;
  align-items: center;
  border-radius: 3px;
  transition: background 1s;

  &:hover {
    background: #ededed;
  }
`

export {
  gridLayoutClass,
  GridContainer
}