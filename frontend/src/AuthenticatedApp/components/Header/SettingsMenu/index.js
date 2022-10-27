import SettingsIcon from '@mui/icons-material/Settings';
import { Box, IconButton } from '@mui/material';
import { useState } from 'react';
import SettingsModal from './SettingsModal';

const sx = {
  box: { display: 'flex', alignItems: 'center', textAlign: 'center' },
  iconButton: { ml: 2 },
}

const SettingsMenu = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={sx.box}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={sx.iconButton}
        >
          <SettingsIcon/>
        </IconButton>
      </Box>
      <SettingsModal open={open} handleClose={handleClose} />
    </>
  )
}

export default SettingsMenu;