type NumberKeys<T> = {
    [K in keyof T]: T[K] extends number ? K : never
}[keyof T]

export function minBy<T>(arr: T[], key: NumberKeys<T>): T | undefined {
    if (arr.length === 0) {
        return undefined
    }

    return arr.reduce((min, item) => {
        const value = item[key]
        const minValue = min[key]

        if (typeof value !== 'number' || typeof minValue !== 'number') {
            throw new TypeError(`Property '${String(key)}' must be a number`)
        }

        return value < minValue ? item : min
    })
}
