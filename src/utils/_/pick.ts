// cspell:disable
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
}

export function _pick<T extends object, K extends keyof T>(
    input: T | T[],
    keys: readonly K[],
): T extends any[] ? Pick<T[number], K>[] : Pick<T, K> {
    if (Array.isArray(input)) {
        return input.map(obj => pickFromObject(obj, keys)) as any
    }
    else {
        return pickFromObject(input, keys) as any
    }
}

function pickFromObject<T extends object, K extends keyof T>(obj: T, keys: readonly K[]): Pick<T, K> {
    const result = {} as Pick<T, K>
    for (const key of keys) {
        if (key in obj) {
            result[key] = obj[key]
        }
    }
    return result
}

// // ตัวอย่างการใช้งาน
// const obj = { a: 1, b: 2, c: 3 }
// const result = _pick(obj, ['a', 'b'] as const)

// const arr = [{ a: 1, b: 2, c: 3 }, { a: 4, b: 5, c: 6 }]
// const arrResult = _pick(arr, ['a', 'b'] as const)
