export default function compare<Type>(a: Type, b: Type, sortKey: string, ascending: boolean, sortAs: string): number {
  const aVal = a[sortKey as keyof Type]
  const bVal = b[sortKey as keyof Type]

  /* true for every type of sort */
  if (aVal === bVal) {
    return 0
  } else if (aVal == null) {
    return 1
  } else if (bVal == null) {
    return -1
  }

  if (typeof sortAs === 'string') {
    if (ascending) {
      return aVal < bVal ? -1 : 1
    } else {
      return aVal < bVal ? 1 : -1
    }
  }

  /* handle sortAs 'number' */
  if (ascending) {
    return (aVal as any) - (bVal as any)
  } else {
    return (bVal as any) - (aVal as any)
  }
}
