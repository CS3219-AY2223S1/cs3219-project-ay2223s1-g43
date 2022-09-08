import { Avatar, Box, IconButton, Menu, MenuItem } from "@mui/material"
import { useState } from "react";
import { useAuthContext } from "../../../hooks/auth/useAuthContext";
import WarningDialog from "../../WarningDialog";
import ChangePasswordModal from "./ChangePasswordModal";
import LogOutButton from "./LogOutButton";

const sx = {
  avatar: { width: 32, height: 32, bgcolor: "primary.main" },
  box: { display: 'flex', alignItems: 'center', textAlign: 'center' },
  iconButton: { ml: 2 },
  paperProps: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
  }
}

const AvatarMenu = () => {
  const { username } = useAuthContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false)
  const [errorDialogMsg, setErrorDialogMsg] = useState("")
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const setErrorDialog = (msg) => {
    setErrorDialogMsg(msg)
    setIsErrorDialogOpen(true)
  }

  const closeErrorDialog = () => setIsErrorDialogOpen(false)

  const closePasswordModal = () => setIsChangePasswordModalOpen(false)


  return (
    <>
      <Box sx={sx.box}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={sx.iconButton}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar sx={sx.avatar}>{username.charAt(0).toUpperCase()}</Avatar>
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: sx.paperProps,
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => setIsChangePasswordModalOpen(true)}>
          Change Password
        </MenuItem>
        <LogOutButton setErrorDialog={setErrorDialog} />
      </Menu>
      <WarningDialog dialogMsg={errorDialogMsg} isDialogOpen={isErrorDialogOpen} closeDialog={closeErrorDialog} />
      <ChangePasswordModal isDialogOpen={isChangePasswordModalOpen} closeDialog={closePasswordModal} />
    </>
  );
}

export default AvatarMenu;