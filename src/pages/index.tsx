import type { NextPage } from 'next'
import Head from 'next/head'
import { ReactNode, useMemo } from 'react'
import { Employee } from '../../types'
import EmployeeCard from '../components/EmployeeCard/EmployeeCard'
import exampleData from '../../exampleData.json'
import { Wrap, Center } from '@chakra-ui/react'

const CARD_SPACING = '36px'
const MAX_WIDTH = `${36 * 5 + 4 * 200}px`

const Home: NextPage = () => {
  const renderEmployees = useMemo(
    (): ReactNode[] =>
      exampleData.slice(110, 130).map((employee: Employee) => <EmployeeCard employee={employee} key={employee.name} />),
    []
  )

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>List of employees at 1337</title>
      </Head>

      <Center>
        <Wrap
          shouldWrapChildren
          spacing={CARD_SPACING}
          padding={CARD_SPACING}
          bg="gray.50"
          maxW={MAX_WIDTH}
          justify={{ base: 'center', sm: 'flex-start' }}
        >
          {renderEmployees}
        </Wrap>
      </Center>
    </>
  )
}

export default Home
