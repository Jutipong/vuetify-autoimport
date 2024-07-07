// ยังไม่เสร็จ

type DateFormat = 'dd/mm/yyyy' | 'dd/mm/yyyy HH:mm:ss' | 'yyyy/mm/dd'

export type TimeConfig =
    '10sec' | '20sec' | '30sec' |
    '1min' | '3min' | '5min' | '10min' | '15min' | '20min' | '30min' | '45min'
    | '1hour' | '2hour' | '3hour' | '4hour' | '5hour' | '6hour' | '7hour' | '8hour'
    | '9hour' | '10hour' | '11hour' | '12hour' | '1day'

function useDateTime() {
    function dateTh(date: Date, formate: DateFormat = 'dd/mm/yyyy') {
        const dateTh = new Date(date)
        const day = dateTh.getDate()
        const month = dateTh.getMonth() + 1
        const year = dateTh.getFullYear() + 543
        return formate === 'dd/mm/yyyy' ? `${day}/${month}/${year}` : `${year}/${month}/${day}`
    }

    function timeCofig(timeout: TimeConfig) {
        switch (timeout) {
            case '10sec':
                return 10 * 1000
            case '20sec':
                return 20 * 1000
            case '30sec':
                return 30 * 1000
            case '1min':
                return 60 * 1000
            case '3min':
                return 3 * 60 * 1000
            case '5min':
                return 5 * 60 * 1000
            case '10min':
                return 10 * 60 * 1000
            case '20min':
                return 20 * 60 * 1000
            case '15min':
                return 15 * 60 * 1000
            case '30min':
                return 30 * 60 * 1000
            case '45min':
                return 45 * 60 * 1000
            case '1hour':
                return 60 * 60 * 1000
            case '2hour':
                return 2 * 60 * 60 * 1000
            case '3hour':
                return 3 * 60 * 60 * 1000
            case '4hour':
                return 4 * 60 * 60 * 1000
            case '5hour':
                return 5 * 60 * 60 * 1000
            case '6hour':
                return 6 * 60 * 60 * 1000
            case '7hour':
                return 7 * 60 * 60 * 1000
            case '8hour':
                return 8 * 60 * 60 * 1000
            case '9hour':
                return 9 * 60 * 60 * 1000
            case '10hour':
                return 10 * 60 * 60 * 1000
            case '11hour':
                return 11 * 60 * 60 * 1000
            case '12hour':
                return 12 * 60 * 60 * 1000
            case '1day':
                return 24 * 60 * 60 * 1000
            default:
                return 0
        }
    }

    return { dateTh, timeCofig }
}

export { useDateTime }
