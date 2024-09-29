export function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object'
        && value !== null
        && !Array.isArray(value)
        && !(value instanceof Date)
        && !(value instanceof RegExp)
}

// // ตัวอย่างการใช้งาน
// console.log(isObject({})) // true
// console.log(isObject({ a: 1, b: 2 })) // true
// console.log(isObject(new Object())) // true

// console.log(isObject(null)) // false
// console.log(isObject(undefined)) // false
// console.log(isObject([])) // false
// console.log(isObject([1, 2, 3])) // false
// console.log(isObject(new Date())) // false
// console.log(isObject(/regex/)) // false
// console.log(isObject('string')) // false
// console.log(isObject(42)) // false
// console.log(isObject(true)) // false
// console.log(isObject(() => {})) // false
