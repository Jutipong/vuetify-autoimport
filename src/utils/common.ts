// ยังำทไม่เสร็จ
function getDateTh(date: Date | unknown) {
    const result
        = date
            ? new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })
            : new Date(date as Date).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })

    return result
}

export { getDateTh }
