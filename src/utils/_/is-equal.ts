export function _isEqual(a: any, b: any): boolean {
    // ถ้าเป็นค่าพื้นฐาน (primitive values) หรือ references เดียวกัน
    if (a === b)
        return true

    // ถ้าเป็น null หรือไม่ใช่ออบเจ็กต์
    if (a == null || typeof a !== 'object'
        || b == null || typeof b !== 'object') {
        return false
    }

    // ถ้าเป็น Date
    if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
    }

    // ถ้าเป็น RegExp
    if (a instanceof RegExp && b instanceof RegExp) {
        return a.toString() === b.toString()
    }

    // ตรวจสอบว่าเป็นออบเจ็กต์ประเภทเดียวกัน
    if (Object.prototype.toString.call(a) !== Object.prototype.toString.call(b)) {
        return false
    }

    // เปรียบเทียบ keys
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)

    if (keysA.length !== keysB.length)
        return false

    // เปรียบเทียบค่าแต่ละ key แบบ recursive
    for (const key of keysA) {
        if (!keysB.includes(key))
            return false
        if (!_isEqual(a[key], b[key]))
            return false
    }

    return true
}

// const obj1 = { a: 1, b: { c: 2 } };
// const obj2 = { a: 1, b: { c: 2 } };
// const obj3 = { a: 1, b: { c: 2 } };

// console.log(isEqual(obj1, obj2));  // true
// console.log(isEqual(obj1, obj3));  // false
// console.log(isEqual(1,'1'));
