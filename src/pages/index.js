import {
  Link as ChakraLink,
  Text,
  Code,
  Icon,
  List,
  ListIcon,
  ListItem,
  Flex
} from '@chakra-ui/core'
import Link from 'next/link'

import { useState } from 'react'
import useSWR from 'swr'

import { Hero } from '../components/Hero'
import { Map } from '../components/Map'
import { Search } from '../components/Search'
import { Region } from '../components/Region'
import { ProductSelection, ProductBox } from '../components/Product'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Index = () => {
  const { data, error } = useSWR('/api/regions', fetcher)
  const initialSearch = ''
  const [search, setSearch] = useState(initialSearch)
  const [hovered, setHovered] = useState('')

  return(
  <>
    <Container>
      <Hero />
      <Search term={search} onChange={setSearch} />
      <Flex
        alignItems='center'
        justifyContent="space-around"
        flexDirection="row"
      >
        <Map search={search} onCall={setHovered}/>
        <ProductBox region={hovered} />
      </Flex>
      <DarkModeSwitch />
      <Link href="/age_and_postcode">
        <a>Order here</a>
      </Link>
      <Footer> </Footer>
    </Container>
  </>
  )
}

export default Index
