import cacheData from 'memory-cache'
import type { Employee } from '../../types'
import exampleData from '../../exampleData.json'

const employeesEndpoint = '/v3/employees'
const URL = process.env.TRETTON_BASE_URL + employeesEndpoint

// TODO: send with refreshed date to make sure first and subsequent partial
// fetches are from the same cache? maybe memory-cache has something built in?

export default async function getEmployeesCached(): Promise<Employee[] | undefined> {
  const value: Employee[] = cacheData.get(URL)
  if (value) {
    console.log(`CACHE ${URL} HAS VALUE`)
    return value
  } else {
    console.log(`CACHE ${URL} DOES NOT HAVE VALUE`)
    const hours = 24

    const res = { data: exampleData }

    cacheData.put(URL, res.data, hours * 1000 * 60 * 60)
    return res.data
  }
}
