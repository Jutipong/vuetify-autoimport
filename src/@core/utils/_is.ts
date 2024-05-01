export function _isNullOrEmpty(value: unknown): boolean {
  if (_.isNull(value))
    return true

  switch (typeof value) {
    case 'string':
      return value.trim().length === 0
    case 'object':
      return _.isEmpty(value)
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
