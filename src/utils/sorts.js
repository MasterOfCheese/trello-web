// Sort Columns/Cards
export const mapOrder = (originalArray, orderArray, key) => {
  if ( !originalArray || !orderArray || Array.isArray(key.Array)) return []
  return [...originalArray].sort((a, b) => orderArray.indexOf(a[key]) - orderArray.indexOf(b[key]))
}