export function _isEmpty(value: unknown): boolean {
  if (value === null || value === undefined || value === '')
    return true

  if (Array.isArray(value) && value.length > 0)
    return true

  if (value !== null && !!value && typeof value === 'object' && !Array.isArray(value))
    return true

  return false
}
