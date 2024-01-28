export function _isEmpty(value: unknown): boolean {
  if (isNull(value))
    return true

  switch (typeof value) {
    case 'string':
      return value.trim().length === 0
    case 'object':
      return isEmpty(value)
    case 'number':
      return false
    case 'boolean':
      return false
    case 'undefined':
      return true
    default:
      return true
  }
}
