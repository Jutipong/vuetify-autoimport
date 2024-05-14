function _dateTh() {
  return new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })
}

export { _dateTh }
