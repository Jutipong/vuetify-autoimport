export function _isNullOrEmpty(value: unknown): boolean {
  if (_isNull(value))
    return true

  switch (typeof value) {
    case 'string':
      return value.trim().length === 0
    case 'object':
      return _isEmpty(value)
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
