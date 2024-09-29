// Define the Pick type
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
}

// Implement the pick function
export function _pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    const result = {} as Pick<T, K>
    for (const key of keys) {
        if (key in obj) {
            result[key] = obj[key]
        }
    }
    return result
}

// Define the Omit type
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

// Implement the omit function
export function _omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    const result = { ...obj }
    for (const key of keys) {
        delete result[key]
    }
    return result as Omit<T, K>
}
