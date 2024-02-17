// import React from "react";
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from '~/pages/Boards/BoardBar/BoardBar'
// import BoardContent from './BoardContent'
// có thể import các file/folder đồng cấp nhau như cách ở line5 hoặc line7.
import BoardContent from '~/pages/Boards/BoardContent/BoardContent'


function Board() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar />
      <BoardContent />
    </Container>
  )
}

export default Board
