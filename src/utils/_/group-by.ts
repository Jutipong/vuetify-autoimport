export function _groupBy<T, K extends keyof T>(arr: T[], key: K): Record<string, T[]> {
    return arr.reduce((groups, item) => {
        const groupKey = String(item[key])
        if (!groups[groupKey]) {
            groups[groupKey] = []
        }
        groups[groupKey].push(item)
        return groups
    }, {} as Record<string, T[]>)
}
