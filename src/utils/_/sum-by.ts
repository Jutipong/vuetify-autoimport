type NumberKeys<T> = {
    [K in keyof T]: T[K] extends number ? K : never
}[keyof T]

export function _sumBy<T>(arr: T[], key: NumberKeys<T>, initialValue: number = 0): number {
    return arr.reduce((sum, item) => {
        const value = item[key]
        if (typeof value !== 'number') {
            throw new TypeError(`Property '${String(key)}' must be a number`)
        }
        return sum + value
    }, initialValue)
}
