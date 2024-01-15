import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'
import { pink } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'light', //default is light
    primary: {
      main: '#556cd6'
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: red.A400
    },
    text: {
      secondary: pink[300]
    },
    test: {
      primary: red[500]
    }
  }
})

export default theme