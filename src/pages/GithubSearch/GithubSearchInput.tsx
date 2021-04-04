import { ComponentType, ChangeEventHandler } from 'react'
import { DebounceInput } from 'react-debounce-input'
import { Flex, Box } from 'rebass'
import styled from '@emotion/styled'

import { SUPPORTED_ENTITIES } from '../../const'

const {
  USERS,
  REPO
} = SUPPORTED_ENTITIES

const SearchInput: ComponentType = styled('input')`
  width: 80%;
  height: 35px;
  border-color: transparent;
  padding: 0px 10px;
  border: 1px solid #cccbcb;
  border-radius: 3px;
`

const Dropdown = styled('select')`
  height: 37px;
  border: 1px solid #cccbcb;
  border-radius: 3px;
  padding: 6px;
  color: #757575;
`

interface IGithubSearchInputProps {
  selectedEntity: string;
  onInputChange: ChangeEventHandler<HTMLInputElement>;
  onEntityChange: ChangeEventHandler<HTMLSelectElement>;
}

const GithubSearchInput = (props: IGithubSearchInputProps) => {
  const { selectedEntity, onInputChange, onEntityChange } = props;

  return (
    <Flex mt={3} flexDirection="column">
      <Flex alignItems="center">
        <DebounceInput
          element={SearchInput}
          minLength={3}
          debounceTimeout={500}
          placeholder="Start typing to search..."
          onChange={onInputChange}
        />
        <Box pl={2} width="20%">
          <Dropdown
            value={selectedEntity}
            onChange={onEntityChange}>
            <option value={USERS}>Users</option>
            <option value={REPO}>Repo</option>
          </Dropdown>
        </Box>
      </Flex>
    </Flex>
  );
}

export default GithubSearchInput