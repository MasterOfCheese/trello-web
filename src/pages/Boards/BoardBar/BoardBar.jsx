import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import Button from '@mui/material/Button'
import { capitalizeFirstLetter } from '~/utils/formatters'

const MENU_STYLES = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar({ board }) {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        paddingX: 2,
        overflowX: 'auto',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        '&::-webkit-scrollbar-track': { m: 2 }
      }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} >
        <Chip sx={MENU_STYLES} icon={<DashboardIcon />} label={board?.title} clickable />
        <Chip sx={MENU_STYLES} icon={<VpnLockIcon />} label={capitalizeFirstLetter(board?.type)} clickable />
        <Chip sx={MENU_STYLES} icon={<AddToDriveIcon />} label="Add To Google Drive" clickable />
        <Chip sx={MENU_STYLES} icon={<BoltIcon />} label="Automation" clickable />
        <Chip sx={MENU_STYLES} icon={<FilterListIcon />} label="Filters" clickable />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} >
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': { borderColor: 'white' }
          }}
        >Invite
        </Button>

        <AvatarGroup max={7} sx={{
          gap: '10px',
          '& .MuiAvatar-root': {
            width: 34,
            height: 34,
            fontSize: 16,
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            '&:first-of-type': { bgcolor: '#a4b0be' }
          }
        }}>
          <Tooltip title="namphuongdev">
            <Avatar alt="namphuongdev" src="https://i.pinimg.com/564x/ad/8b/60/ad8b60ab6c5d1a1ae628fbcff2b36a94.jpg" />
          </Tooltip>
          <Tooltip title="namphuongdev">
            <Avatar alt="namphuongdev" src="https://i.pinimg.com/564x/79/2f/83/792f832680c684b1792294a272f625ab.jpg" />
          </Tooltip>
          <Tooltip title="namphuongdev">
            <Avatar alt="namphuongdev" src="https://i.pinimg.com/564x/a3/88/e7/a388e7a6db4ca18c4bbbb202678e4b66.jpg" />
          </Tooltip>
          <Tooltip title="namphuongdev">
            <Avatar alt="namphuongdev" src="https://i.pinimg.com/564x/54/e5/be/54e5be5595a3a2149a7dcb708b51db86.jpg" />
          </Tooltip>
          <Tooltip title="namphuongdev">
            <Avatar alt="namphuongdev" src="https://i.pinimg.com/564x/b6/e1/eb/b6e1eb0c1a150c29388a595fcba58978.jpg" />
          </Tooltip>
          <Tooltip title="namphuongdev">
            <Avatar alt="namphuongdev" src="https://i.pinimg.com/736x/93/c7/56/93c75662b33680c952e82e1720e0976e.jpg" />
          </Tooltip>
          <Tooltip title="namphuongdev">
            <Avatar alt="namphuongdev" src="https://i.pinimg.com/564x/4e/86/de/4e86dec7f45259ef7ad8b54de7edfa49.jpg" />
          </Tooltip>
          <Tooltip title="namphuongdev">
            <Avatar alt="namphuongdev" src="https://i.pinimg.com/564x/d1/60/ed/d160edf40c6589e216b95197ffccfa76.jpg" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar