import dayjs from 'dayjs'

export type DateFormat =
    'DD/MM/YYYY' | 'DD/MM/YYYY HH:mm' | 'DD/MM/YYYY HH:mm:ss' | 'DD/MM/YYYY HH:mm A' | 'DD/MM/YYYY HH:mm:ss A' |
    'YYYY/MM/DD' | 'YYYY/MM/DD HH:mm' | 'YYYY/MM/DD HH:mm:ss' | 'YYYY/MM/DD HH:mm A' | 'YYYY/MM/DD HH:mm:ss A' |
    'HH:mm' | 'HH:mm:ss' | 'HH:mm A' | 'HH:mm:ss A'

export type TimeConfig =
    '1sec' | '5sec' | '10sec' | '15sec' | '20sec' | '25sec' | '30sec' | '35sec' | '40sec' | '45sec' | '50sec' | '55sec' |
    '1min' | '2min' | '3min' | '4min' | '5min' | '10min' | '15min' | '20min' | '25min' | '30min' | '35min' | '40min' | '45min' | '50min' | '55min' |
    '1hour' | '2hour' | '3hour' | '4hour' | '5hour' | '6hour' | '7hour' | '8hour' |
    '9hour' | '10hour' | '11hour' | '12hour' | '1day'

export function dateFormat(date: Date | string, formate: DateFormat = 'DD/MM/YYYY') {
    return dayjs(date).format(formate)
}

export function timeCofig(timeout: TimeConfig) {
    switch (timeout) {
        case '1sec':
            return 1 * 1000
        case '5sec':
            return 5 * 1000
        case '10sec':
            return 10 * 1000
        case '15sec':
            return 15 * 1000
        case '20sec':
            return 20 * 1000
        case '25sec':
            return 25 * 1000
        case '30sec':
            return 30 * 1000
        case '35sec':
            return 35 * 1000
        case '40sec':
            return 40 * 1000
        case '45sec':
            return 45 * 1000
        case '50sec':
            return 50 * 1000
        case '55sec':
            return 55 * 1000
        case '1min':
            return 60 * 1000
        case '2min':
            return 2 * 60 * 1000
        case '3min':
            return 3 * 60 * 1000
        case '4min':
            return 4 * 60 * 1000
        case '5min':
            return 5 * 60 * 1000
        case '10min':
            return 10 * 60 * 1000
        case '15min':
            return 15 * 60 * 1000
        case '20min':
            return 20 * 60 * 1000
        case '25min':
            return 25 * 60 * 1000
        case '30min':
            return 30 * 60 * 1000
        case '35min':
            return 35 * 60 * 1000
        case '40min':
            return 40 * 60 * 1000
        case '45min':
            return 45 * 60 * 1000
        case '50min':
            return 50 * 60 * 1000
        case '55min':
            return 55 * 60 * 1000
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
