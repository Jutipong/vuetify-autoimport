export function _sum(...numbers: number[]): number {
    return numbers.reduce((acc, current) => acc + current, 0)
}

// Examples with error handling
// console.log(_sum(1,  3,  5));  // Output: 11 (and a warning for 'four')
// console.log(_sum(1, '2', 3, 'four', 5));  // error
// console.log(_sum([1, '2', 3, 'four', 5]));  // error
