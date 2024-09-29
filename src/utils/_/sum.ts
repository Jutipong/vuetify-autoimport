export function _sum(...numbers: number[]): number {
    return numbers.reduce((acc, current) => acc + current, 0)
}

// Examples with error handling
// console.log(_sum(1,  3,  5));  // Output: 11 (and a warning for 'four')
// console.log(_sum(1, '2', 3, 'four', 5));  // error
// console.log(_sum([1, '2', 3, 'four', 5]));  // error

type NumberKeys<T> = {
    [K in keyof T]: T[K] extends number ? K : never
}[keyof T]

export function _sumBy<T>(objects: T[], property: NumberKeys<T>): number {
    return objects.reduce((acc, obj) => {
        const value = obj[property]
        if (typeof value === 'number') {
            return acc + value
        }
        return acc
    }, 0)
}

// const items = [
//   { name: 'Apple', price: 0.5, quantity: 3 },
//   { name: 'Banana', price: 0.3, quantity: 5 },
//   { name: 'Orange', price: 0.6, quantity: 2 },
//   { name: 'test', price: 0.6, quantity: 2 }
// ];

// console.log(_sumBy(items, 'price'));  // Output: 1.4
// console.log(_sumBy(items, 'quantity'));  // Output: 10
// console.log(_sumBy(items, 'name'));  // Output: error
