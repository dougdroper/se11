import { Box, Flex, InputGroup, InputRightElement, Input, Icon } from '@chakra-ui/core'

import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export const Search = ({
  term,
  onChange = () => {}
}) => {
  const { data, error } = useSWR('/api/regions', fetcher)
  return (
    <Flex justifyContent="center">
      <InputGroup>
        <InputRightElement children={<Icon name="search" color="gray.300" />} />
        <Input type="search" placeholder="search" value={term} onChange={e => onChange(e.target.value)} />
      <Flex>
      <Box>
#{JSON.stringify(data)}
  </Box>
      </Flex>
      </InputGroup>
    </Flex>
  )
}
