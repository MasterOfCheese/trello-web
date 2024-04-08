/**
 * Capitalize the first letter of a string
 */
export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}


/*
Hàm generatePlaceholderCard: Xử lý bug logic thư viện Dnd-kit khi Column rỗng
FE_PlaceholderCard chỉ để xử lý giữ chỗ card -> fix bug empty card trên FrontEnd
chứ không liên quan đến BackEnd
*/
export const generatePlaceholderCard = (column) => {
  return {
    _id: `${column.id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._columnId,
    FE_PlaceholderCard: true
  }
}