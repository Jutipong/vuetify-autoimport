// ยังไม่เสร็จ

type DateFormat = 'dd/mm/yyyy' | 'dd/mm/yyyy HH:mm:ss' |
    'yyyy/mm/dd'

function _dateTh(date: Date, formate: DateFormat = 'dd/mm/yyyy') {
    const dateTh = new Date(date)
    const day = dateTh.getDate()
    const month = dateTh.getMonth() + 1
    const year = dateTh.getFullYear() + 543
    return formate === 'dd/mm/yyyy' ? `${day}/${month}/${year}` : `${year}/${month}/${day}`
}

export { _dateTh }
