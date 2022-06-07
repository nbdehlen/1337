import { ReactNode, useMemo, useState, useRef } from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import type { Employee, EmployeeMeta } from '../../types'
import Head from 'next/head'
import { Wrap, Center, Box } from '@chakra-ui/react'
import axios, { AxiosResponse } from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spinner from '../components/atoms/Spinner'
import HeaderOptions, { Field, HeaderOptionsProps } from '../components/molecules/HeaderOptions'
import employeeOptions from '../../assets/employeeOptions.json'
import EmployeeCard from '../components/EmployeeCard'

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
  const [totalAvailable, setTotalAvailable] = useState<number>(total)
  const employeeParams = useRef<HeaderOptionsProps>()

  const renderEmployees = useMemo((): ReactNode[] | undefined => {
    if (employees.length > 0) {
      return employees.map((employee: Employee) => <EmployeeCard employee={employee} key={employee.name} />)
    }
  }, [employees])

  const fetchMore = async (): Promise<void> => {
    const res: AxiosResponse<{ employees: Employee[]; meta: EmployeeMeta }> = await axios.get(URL, {
      params: {
        ...employeeParams.current,
        start: employees.length,
        end: employees.length + FETCH_COUNT,
      },
    })
    setEmployees((prev) => [...prev, ...res.data.employees])
    setTotalAvailable(res.data.meta.total)
  }

  const handleData = async (params: HeaderOptionsProps): Promise<void> => {
    employeeParams.current = params
    const res: AxiosResponse<{ employees: Employee[]; meta: EmployeeMeta }> = await axios.get(URL, {
      params: {
        ...params,
        start: 0,
        end: FETCH_COUNT,
      },
    })
    setEmployees(res.data.employees)
    setTotalAvailable(res.data.meta.total)
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>List of employees at 1337</title>
      </Head>
      <Center>
        <Box maxW={MAX_WIDTH} bg="gray.50">
          <HeaderOptions
            sortable={employeeOptions as Field[]}
            initialField={employeeOptions[0] as Field}
            initialSortDirAsc
            handleData={handleData}
          />
          <InfiniteScroll
            dataLength={employees.length}
            next={fetchMore}
            hasMore={employees.length > 0 && totalAvailable > employees.length}
            loader={<Spinner bg="gray.50" />}
          >
            <Wrap
              shouldWrapChildren
              spacing={CARD_SPACING}
              padding={CARD_SPACING}
              justify={{ base: 'center', sm: 'flex-start' }}
            >
              {renderEmployees}
            </Wrap>
          </InfiniteScroll>
        </Box>
      </Center>
    </>
  )
}

export default Home

// We can't call nextjs API until it's running and our original data source
// doesn't have pagination so using SSR over ISR for now.
export const getServerSideProps: GetServerSideProps = async () => {
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
