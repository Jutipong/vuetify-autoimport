export function _uniqBy<T>(arr: T[], key: keyof T): T[] {
    return arr.reduce((acc: T[], current) => {
        const x = acc.find(item => item[key] === current[key])
        if (!x) {
            return acc.concat([current])
        }
        else {
            return acc
        }
    }, [])
}
