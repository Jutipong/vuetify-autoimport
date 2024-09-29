export function _isArray<T>(value: unknown): value is T[] {
    return Array.isArray(value)
}

// // ตัวอย่างการใช้งาน
// console.log(isArray([])) // true
// console.log(isArray([1, 2, 3])) // true
// console.log(isArray([])) // true

// console.log(isArray(null)) // false
// console.log(isArray(undefined)) // false
// console.log(isArray({})) // false
// console.log(isArray('array')) // false
// console.log(isArray(42)) // false
