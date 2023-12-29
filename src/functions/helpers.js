/**
 * date times are filtered out of the results since it's useless
 *
 * @param {array} data - should work on most of our things it's pretty universal
 * @param {string} searchQuery - A search string to filter for
 *
 * @returns {array} filteredData - Returns the data filtered by your searchQuery
 */
export function Customfilter(data, searchQuery) {
  const filteredData = data.filter((item) => {
    const valuesArray = Object.entries(item)
    for (const [key, value] of valuesArray) {
      if (key === 'createdAt' || key === 'updatedAt') {
        continue
      }
      const stringValue = String(value)
      if (stringValue.toLowerCase().includes(searchQuery.toLowerCase())) {
        return true
      }
    }
    return false
  })
  return filteredData
}

export function formatDateString(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString()
}

export function formStringsToIntegers(obj) {
  const res = {}
  for (const key in obj) {
    if (key === 'name') {
      res[key] = obj[key]
    } else if (Object.prototype.hasOwnProperty.call(obj, key)) {
      res[key] = !isNaN(obj[key]) ? Number(obj[key]) : obj[key]
    }
  }
  return res
}
