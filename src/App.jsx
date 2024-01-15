import Button from '@mui/material/Button'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import ThreeDRotation from '@mui/icons-material/ThreeDRotation'
import HomeIcon from '@mui/icons-material/Home'
import { yellow } from '@mui/material/colors'
import MdPhone from '@mui/icons-material/Phone'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'

function App() {
  return (
    <>
      <div>NamPhuongDev</div>
      <Typography variant='body2' color='text.secondary'>NamPhuongTest TypoGraphy 01</Typography>
      <Typography variant='body1' color='test.primary'>NamPhuongTest TypoGraphy 02</Typography>

      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <br/>
      <hr />
      <AccessAlarmIcon/>
      <ThreeDRotation/>
      <HomeIcon />
      <HomeIcon color="primary" />
      <HomeIcon color="secondary" />
      <HomeIcon color="success" />
      <HomeIcon color="action" />
      <HomeIcon color="disabled" />
      <HomeIcon sx={{ color: yellow[500] }} />
      <br />
      <Chip icon={<MdPhone />} label="Call me" />
    </>
  )
}

export default App
