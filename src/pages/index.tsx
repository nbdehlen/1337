import type { NextPage } from 'next'
import Head from 'next/head'
import { Center, Heading } from '@chakra-ui/react'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>List of employees at 1337</title>
      </Head>
      <Center>
        <Heading>EOOO</Heading>
      </Center>
    </>
  )
}

export default Home
