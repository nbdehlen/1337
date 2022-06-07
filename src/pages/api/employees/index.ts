import type { NextApiRequest, NextApiResponse } from 'next'
import type { Employee, EmployeeMeta } from '../../../../types'
import queryParamsToString from '../../../lib/queryParamsToString'
import getEmployeesCached from '../../../lib/getEmployeesCached'
import compare from '../../../lib/compare'

type Props = {
  employees: Employee[]
  meta: EmployeeMeta
}

export default async function getEmployees(
  req: NextApiRequest,
  res: NextApiResponse<Props | undefined>
): Promise<void> {
  const employees = await getEmployeesCached()

  if (employees && employees.length > 0) {
    const { sortKey, sortDirAsc, sortAs, filterKey, filterValue, end, start } = queryParamsToString(req.query)
    const startNum = Number.isNaN(start) ? 0 : Number(start)
    const endNum = Number.isNaN(end) ? 0 : Number(end)
    const asc = !/false/i.test(sortDirAsc)

    let data: Employee[]

    if (!filterKey || !filterValue || filterValue.length < 1) {
      if (sortKey && sortAs) {
        /* No filter but sorting */
        data = employees.sort((a, b) => compare<Employee>(a, b, sortKey, asc, sortAs))
      } else {
        data = employees
      }
    } else {
      if (sortKey && sortAs) {
        /* Filter and sorting */
        data = employees
          .filter((obj) => {
            const value = obj[filterKey as keyof Employee]
            if (typeof value === 'string') {
              return value.toLowerCase().includes(filterValue.toLowerCase())
            }
            return false
          })
          .sort((a, b) => compare<Employee>(a, b, sortKey, asc, sortAs))
      } else {
        data = employees.filter((obj) => {
          const value = obj[filterKey as keyof Employee]
          if (typeof value === 'string') {
            return value.toLowerCase().includes(filterValue.toLowerCase())
          }
          return false
        })
      }
    }

    if (data) {
      const meta = { total: data?.length ?? 0 }
      res.status(200).json({ employees: data.slice(startNum, endNum), meta })
    } else {
      res.status(503)
    }
  }
}
