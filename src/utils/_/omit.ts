// cspell:disable
type Omit<T, K extends keyof T> = {
    [P in Exclude<keyof T, K>]: T[P]
}

export function _omit<T extends object, K extends keyof T>(
    input: T | T[],
    keys: readonly K[],
): T extends any[] ? Omit<T[number], K>[] : Omit<T, K> {
    if (Array.isArray(input)) {
        return input.map(obj => omitFromObject(obj, keys)) as any
    }
    else {
        return omitFromObject(input, keys) as any
    }
}

function omitFromObject<T extends object, K extends keyof T>(obj: T, keys: readonly K[]): Omit<T, K> {
    const result = { ...obj }
    for (const key of keys) {
        delete result[key]
    }
    return result as Omit<T, K>
}

// // ตัวอย่างการใช้งาน
// const obj = { a: 1, b: 2, c: 3 }
// const result = _omit(obj, ['a', 'b'] as const)

// const arr = [{ a: 1, b: 2, c: 3 }, { a: 4, b: 5, c: 6 }]
// const arrResult = _omit(arr, ['b', 'b'] as const)
