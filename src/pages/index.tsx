import { ReactNode, useMemo, useState } from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import type { Employee, EmployeeMeta } from '../../types'
import Head from 'next/head'
import EmployeeCard from '../components/EmployeeCard/EmployeeCard'
import { Wrap, Center } from '@chakra-ui/react'
import axios, { AxiosResponse } from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spinner from '../components/atoms/Spinner'

const CARD_SPACING = '36px'
const MAX_WIDTH = `${36 * 5 + 4 * 200}px`
const FETCH_COUNT = 16
const URL = process.env.NEXT_PUBLIC_API_EMPLOYEES ?? ''

type OwnProps = {
  initialEmployees: Employee[] | undefined
  meta: EmployeeMeta
}

type Props = OwnProps

const Home: NextPage<Props> = ({ initialEmployees, meta: { total } }) => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees ?? [])

  const renderEmployees = useMemo((): ReactNode[] | undefined => {
    if (employees.length > 0) {
      return employees.map((employee: Employee) => <EmployeeCard employee={employee} key={employee.name} />)
    }
  }, [employees])

  const fetchData = async (): Promise<void> => {
    const res: AxiosResponse<{ employees: Employee[] }> = await axios.get(URL, {
      params: {
        start: employees.length,
        end: employees.length + FETCH_COUNT,
      },
    })
    setEmployees((prev) => [...prev, ...res.data.employees])
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>List of employees at 1337</title>
      </Head>
      <InfiniteScroll
        dataLength={employees.length}
        next={fetchData}
        hasMore={employees.length > 0 && employees.length !== total}
        loader={<Spinner bg="gray.50" />}
      >
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
      </InfiniteScroll>
    </>
  )
}

export default Home

// We can't call nextjs API until it's running and our original data source
// doesn't have pagination so using SSR over ISR for now.
export const getServerSideProps: GetServerSideProps = async () => {
  console.log({ URL })
  const res: AxiosResponse<{ employees: Employee[]; meta: EmployeeMeta }> = await axios.get(URL, {
    params: {
      start: 0,
      end: FETCH_COUNT,
    },
  })

  return {
    props: {
      initialEmployees: res.data.employees,
      meta: res.data.meta,
    },
  }
}
