// Define the Pick type
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export function _omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    const result = { ...obj }
    for (const key of keys) {
        delete result[key]
    }
    return result as Omit<T, K>
}
