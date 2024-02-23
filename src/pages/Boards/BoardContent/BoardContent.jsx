import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  // PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'

function BoardContent({ board }) {
  // Nếu dùng PointerSensor default thì phải dùng css touch-action nhưng sẽ có bug kéo thả mobile, nên ko dùng nữa.
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint:{ distance:10 } })
  // Require the mouse to move by 10 pixels for change the event on console
  const mouseSensor = useSensor(MouseSensor, { activationConstraint:{ distance:10 } }) // Require the mouse to move by 10 pixels for change the event
  const touchSensor = useSensor(TouchSensor, { activationConstraint:{ delay: 250, tolerance: 500 } }) // Phải nhấn giữ 250ms+dung sai của cảm ứng là 500px thì mới kích hoạt event
  const sensors = useSensors(mouseSensor, touchSensor)
  // Nên ưu tiên sử dụng 2 loại sensor là mouse và touch để có UX tốt nhất trên mobile, no bugged
  const [orderedColumns, setOrderedColumns] = useState([])

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragEnd = (event) => {
    // console.log('handleDragEnd:', event)
    const { active, over } = event

    // kiểm tra nếu ko tồn tại over(kéo đi đâu ko đúng vị trí ) thì return luôn để tránh bugs
    if (!over) return

    // Còn nếu vị trí mới after kéo thả khác so với vị trí ban đầu thì:
    if (active.id !== over.id) {
      //lấy vị trí cũ từ thằng active
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
      //lấy vị trí cũ mới từ thằng over
      const newIndex = orderedColumns.findIndex(c => c._id === over.id)

      //Dùng arrayMove của dnd Kit để sắp xếp lại mảng Columns ban đầu
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)

      //2 cái console.log gọi dữ liệu columns dưới đây để sau gọi API
      // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
      // console.log('dndOrderedColumns: ', dndOrderedColumns)
      // console.log('dndOrderedColumnsIds: ', dndOrderedColumnsIds)

      // Cập nhật lại state columns ban đầu sau khi đã kéo thả
      setOrderedColumns(dndOrderedColumns)
    }
  }
  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Box
        sx={{
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          p: '10px 0'
        }}>
        <ListColumns columns={orderedColumns} />
      </Box>
    </DndContext>
  )
}

export default BoardContent