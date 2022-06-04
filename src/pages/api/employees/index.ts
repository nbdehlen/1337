import type { NextApiRequest, NextApiResponse } from 'next'
import { Employee } from '../../../../types'
import getEmployeesCached from '../../../lib/getEmployeesCached'

export default async function getInitialEmployees(
  req: NextApiRequest,
  res: NextApiResponse<{ employees: Employee[] } | { error: string }>
): Promise<void> {
  const employees = await getEmployeesCached()

  if (!employees || employees.length === 0) {
    res.status(503)
  } else if (employees.length < 20) {
    res.status(200).json({ employees })
  } else {
    res.status(200).json({ employees: employees.slice(0, 20) })
  }
}
