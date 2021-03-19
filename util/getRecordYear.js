function getRecordYear(recordYear, yearList) {
  !yearList.has(recordYear) ? yearList.add(recordYear) : ''
  return yearList
}

module.exports = getRecordYear