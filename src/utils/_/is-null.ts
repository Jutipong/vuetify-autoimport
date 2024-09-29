export function isNull(value: any): boolean {
    if (value === null || value === undefined) {
        return true
    }

    if (typeof value === 'number' && (Number.isNaN(value) || !Number.isFinite(value))) {
        return true
    }

    if (typeof value === 'string' && value.trim() === '') {
        return true
    }

    if (Array.isArray(value) && value.length === 0) {
        return true
    }

    if (typeof value === 'object' && Object.keys(value).length === 0) {
        return true
    }

    return false
}

// // ตัวอย่างการใช้งาน
// console.log(isNull(null));  // true
// console.log(isNull(undefined));  // true
// console.log(isNull(''));  // true
// console.log(isNull('   '));  // true
// console.log(isNull([]));  // true
// console.log(isNull({}));  // true
// console.log(isNull(Number('not a number Nam')));  // true
// console.log(isNull(Infinity));  // true

// console.log(isNull(0));  // false
// console.log(isNull(false));  // false
// console.log(isNull('hello'));  // false
// console.log(isNull([1, 2, 3]));  // false
// console.log(isNull({ a: 1 }));  // false
