export function isDate(value: unknown): value is Date {
    return (
        value instanceof Date
        && !Number.isNaN(value.getTime())
    )
}

// // ตัวอย่างการใช้งาน
// console.log(isDate(new Date())) // true
// console.log(isDate(new Date('2023-01-01'))) // true
// console.log(isDate(Date.now())) // false (เป็น number ไม่ใช่ Date object)

// console.log(isDate({})) // false
// console.log(isDate(null)) // false
// console.log(isDate(undefined)) // false
// console.log(isDate('2023-01-01')) // false (เป็น string ไม่ใช่ Date object)
// console.log(isDate(new Date('invalid date'))) // false
