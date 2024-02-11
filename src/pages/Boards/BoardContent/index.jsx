import Box from '@mui/material/Box'

function BoardContent() {
  return (
    <Box
      sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0'),
        width: '100%',
        height: (theme) =>
          `calc(100vh - ${theme.trelloCustom.appBarHeight} - ${theme.trelloCustom.boardBarHeight})`,
        display: 'flex',
        alignItems: 'center'
      }}
    >
    Board Content
    </Box>
  )
}

export default BoardContent