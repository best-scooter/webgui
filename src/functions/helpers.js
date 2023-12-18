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
        return false
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
