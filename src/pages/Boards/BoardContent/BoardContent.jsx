import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  // PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep } from 'lodash'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
  // Nếu dùng PointerSensor default thì phải dùng css touch-action nhưng sẽ có bug kéo thả mobile, nên ko dùng nữa.
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint:{ distance:10 } })
  // Require the mouse to move by 10 pixels for change the event on console
  const mouseSensor = useSensor(MouseSensor, { activationConstraint:{ distance:10 } }) // Require the mouse to move by 10 pixels for change the event
  const touchSensor = useSensor(TouchSensor, { activationConstraint:{ delay: 250, tolerance: 500 } }) // Phải nhấn giữ 250ms+dung sai của cảm ứng là 500px thì mới kích hoạt event
  const sensors = useSensors(mouseSensor, touchSensor)
  // Nên ưu tiên sử dụng 2 loại sensor là mouse và touch để có UX tốt nhất trên mobile, no bugged
  const [orderedColumns, setOrderedColumns] = useState([])

  // Cùng 1 thời điểm thì chỉ có 1 trong 2 phần tử (Card/Column) được kéo
  const [activeDragItemID, setActiveDragItemID] = useState([null])
  const [activeDragItemType, setActiveDragItemType] = useState([null])
  const [activeDragItemData, setActiveDragItemData] = useState([null])


  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  // find a Column with CardId
  const findColumnByCardId = (cardId) => {
    return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }
  // Trigger khi bắt đầu kéo (drug) 1 phần tử
  const handleDragStart = (event) => {
    // console.log('handleDragStart: ', event)
    setActiveDragItemID(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  }

  // Trigger trong quá trình kéo (Drag) 1 phần tử
  const handleDragOver = (event) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return // do nothing if Dragging Column

    // And this code below will solve for Dragging Card
    // console.log('handleDragOver:', event)
    const { active, over } = event

    // kiểm tra nếu ko tồn tại active và over(kéo linh tinh ra ngoài Container) thì return luôn để tránh crash web
    if (!active || !over) return

    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active // activeDraggingCard: The Card that was Dragging
    const { id: overCardId } = over

    // Find 2 Columns with CardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    // Nếu không tồn tại 1 trong 2 thằng thì không làm gì hết để tránh crash web
    if (!activeColumn || !overColumn) return
    // Chỉ xử lý kéo card qua lại giữa 2 column khác nhau, còn nếu kéo trong cùng 1 column thì không làm gì
    // Vì đây đang là đoạn xử lý lúc kéo(HandleDragOver), còn xử lý lúc thả(HandleDragEnd) thì sẽ code sau.
    if (activeColumn._id !== overColumn._id) {
      setOrderedColumns(prevColumns => {
        // Tìm vị trí(index) của overCard trong column đích (nơi mà activeCard sắp được thả)
        const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

        //Logic tính toán "cardIndex mới" (trên/dưới của overCard) lấy chuẩn đầu ra từ code của lib:
        let newCardIndex
        const isBelowOverItem = active.rect.current.translated &&
                active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0
        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

        // Clone mảng OrderedColumnsState cũ ra 1 cái mới để xử lý data rồi return - cập nhật lại OrderedColumnsState mới.
        const nextColumns = cloneDeep(prevColumns)
        const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
        const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

        // nextActiveColumn: Old Column
        if (nextActiveColumn) {
          // Xóa card ở column active (cũng có thể hiểu là column cũ lúc kéo card ra khỏi nó để sang column khác )
          nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

          // cập nhật lại mảng CardOrderIds cho chuẩn dữ liệu
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
        }

        // nextOverColumn: New Column
        if (nextOverColumn) {
          // Kiểm tra card đang kéo có tồn tại ở overColumn chưa, nếu có thì cần xóa nó trước.
          nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

          // Thêm cái card đang kéo vào overColumn theo vị trí index mới.
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)

          // cập nhật lại mảng CardOrderIds cho chuẩn dữ liệu
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
        }

        return nextColumns
      })
    }
  }

  // Trigger khi kết thúc hành động kéo (drug) 1 phần tử => hành động thả (drop)
  const handleDragEnd = (event) => {
    // console.log('handleDragEnd:', event)

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // console.log('Hanh dong keo tha Card - Tam thoi ko lam gi ca')
      return
    }
    const { active, over } = event

    // kiểm tra nếu ko tồn tại active và over(kéo linh tinh ra ngoài Container) thì return luôn để tránh crash web
    if (!active || !over) return

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

    setActiveDragItemID(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }

  // Animation khi Drop phần tử
  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } })
  }
  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      sensors={sensors}
    >
      <Box
        sx={{
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          p: '10px 0'
        }}>
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent