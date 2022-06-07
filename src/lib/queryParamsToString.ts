import { NextApiRequestQuery } from 'next/dist/server/api-utils'

export default function queryParamsToString(params: NextApiRequestQuery) {
  const obj: { [key: string]: string } = {}

  Object.keys(params).forEach((key) => {
    const val = params[key]
    if (Array.isArray(val)) {
      obj[key] = val.join(' ')
    } else {
      obj[key] = val
    }
  })

  return obj
}
