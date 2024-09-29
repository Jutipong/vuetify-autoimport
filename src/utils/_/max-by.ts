type NumberKeys<T> = {
    [K in keyof T]: T[K] extends number ? K : never
}[keyof T]

export function maxBy<T>(arr: T[], key: NumberKeys<T>): T | undefined {
    if (arr.length === 0) {
        return undefined
    }

    return arr.reduce((max, item) => {
        const value = item[key]
        const maxValue = max[key]

        if (typeof value !== 'number' || typeof maxValue !== 'number') {
            throw new TypeError(`Property '${String(key)}' must be a number`)
        }

        return value > maxValue ? item : max
    })
}
