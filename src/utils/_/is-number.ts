export function isNumber(value: unknown): value is number {
    return typeof value === 'number' && !Number.isNaN(value) && Number.isFinite(value)
}

// // ตัวอย่างการใช้งานพื้นฐาน
// console.log(isNumber(42));  // true
// console.log(isNumber(3.14));  // true
// console.log(isNumber(-0));  // true
// console.log(isNumber(0));  // true

// // กรณีพิเศษ
// console.log(isNumber(NaN));  // false
// console.log(isNumber(Infinity));  // false
// console.log(isNumber(-Infinity));  // false

// // ค่าที่ไม่ใช่ตัวเลข
// console.log(isNumber('42'));  // false
// console.log(isNumber(true));  // false
// console.log(isNumber(null));  // false
// console.log(isNumber(undefined));  // false
// console.log(isNumber({}));  // false
// console.log(isNumber([]));  // false
