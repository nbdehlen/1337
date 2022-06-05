import type { NextApiRequest, NextApiResponse } from 'next'
import type { Employee, EmployeeMeta } from '../../../../types'
import getEmployeesCached from '../../../lib/getEmployeesCached'

type Props = {
  employees: Employee[]
  meta: EmployeeMeta
}

export default async function getEmployees(
  req: NextApiRequest,
  res: NextApiResponse<Props | undefined>
): Promise<void> {
  const employees = await getEmployeesCached()
  const start = Number(req.query.start)
  const end = Number(req.query.end)
  const meta = { total: employees?.length ?? 0 }

  if (!employees || employees.length <= 0) {
    res.status(503)
  } else if (employees.length < end - start) {
    res.status(200).json({ employees, meta })
  } else {
    res.status(200).json({ employees: employees.slice(start, end), meta })
  }
}
