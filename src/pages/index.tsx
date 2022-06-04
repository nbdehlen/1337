import { ReactNode, useMemo } from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import type { Employee } from '../../types'
import Head from 'next/head'
import EmployeeCard from '../components/EmployeeCard/EmployeeCard'
import { Wrap, Center } from '@chakra-ui/react'
import axios from 'axios'

const CARD_SPACING = '36px'
const MAX_WIDTH = `${36 * 5 + 4 * 200}px`

type OwnProps = {
  employees: Employee[] | undefined
}

type Props = OwnProps

const Home: NextPage<Props> = ({ employees }) => {
  const renderEmployees = useMemo((): ReactNode[] | undefined => {
    if (employees && employees.length > 0) {
      return employees.map((employee: Employee) => <EmployeeCard employee={employee} key={employee.name} />)
    }
  }, [employees])

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

// We can't call nextjs API until it's running and our original data source
// doesn't have pagination so using SSR over ISR for now.
export const getServerSideProps: GetServerSideProps = async () => {
  const employees = await axios.get('http://localhost:3000/api/employees')

  return {
    props: {
      employees: employees.data.employees,
    },
  }
}
