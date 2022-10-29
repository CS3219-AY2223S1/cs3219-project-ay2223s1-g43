import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import socket from "../../../../api/matching";
import { useRoomContext } from "../../../../hooks/useRoomContext";
import { EDITOR_LANGUAGE_OPTIONS, EDITOR_THEME_OPTIONS } from "../../../../utils/constants";
import { useState } from "react";
import { useAuthContext } from "../../../../hooks/auth/useAuthContext";

const sx = {
  lang: {
    mt: 1
  },
  theme: {
    mt: 2
  }
}

const SettingsModal = (props) => {
  const { open, handleClose } = props
  const { editorTheme, setEditorTheme, editorLanguage, setEditorLanguage } = useRoomContext()
  const [tempTheme, setTempTheme] = useState(editorTheme)
  const [tempLang, setTempLang] = useState(editorLanguage)
  const {userDetails }  = useAuthContext()

  const handleLangChange = (event) => {
    setTempLang(event.target.value);
  };

  const handleThemeChange = (event) => {
    setTempTheme(event.target.value);
  };

  const confirmSettings = () => {
    setEditorLanguage(tempLang);
    setEditorTheme(tempTheme);

    socket.emit('language changed', { userName: userDetails.username, language: tempLang.name });
    handleClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      aria-labelledby="setting-dialog-title"
      aria-describedby="setting-dialog-description"
    >
      <DialogTitle id="setting-dialog-title">
        Settings
      </DialogTitle>
      <DialogContent >
        <FormControl fullWidth sx={sx.lang}>
          <InputLabel id="theme-select-label" >Editor Language</InputLabel>
          <Select
            labelId="theme-select-label"
            id="theme-simple-select"
            value={tempLang}
            label="Editor Language"
            onChange={handleLangChange}
          >
            {EDITOR_LANGUAGE_OPTIONS.map(option => (
              <MenuItem key={option.name} value={option}>{option.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={sx.theme}>
          <InputLabel id="theme-select-label" >Editor Theme</InputLabel>
          <Select
            labelId="theme-select-label"
            id="theme-simple-select"
            value={editorTheme}
            label="Editor Theme"
            onChange={handleThemeChange}
          >
            {EDITOR_THEME_OPTIONS.map(option => (
              <MenuItem key={option.name} value={option.value}>{option.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
      <Button onClick={handleClose} autoFocus>
          Cancel
        </Button>
        <Button onClick={confirmSettings} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SettingsModal;