import cacheData from 'memory-cache'
import type { Employee } from '../../types'
import axios from 'axios'

const URL = process.env.TRETTON_API_EMPLOYEES ?? ''
const API_KEY = process.env.TRETTON_API_KEY ?? ''
const EMPLOYEES = 'employees'

export default async function getEmployeesCached(): Promise<Employee[] | undefined> {
  const value: Employee[] = cacheData.get(EMPLOYEES)
  if (value) {
    return value
  } else {
    const hours = 24

    const { data } = await axios.get(URL, {
      headers: {
        Authorization: API_KEY,
      },
    })

    cacheData.put(EMPLOYEES, data, hours * 1000 * 60 * 60)
    return data
  }
}
