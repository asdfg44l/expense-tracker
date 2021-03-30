function getRecordYear(record, yearList) {
  let recordYear = record.date.getFullYear().toString()
  !yearList.has(recordYear) ? yearList.add(recordYear) : ''
  return yearList
}

module.exports = getRecordYear