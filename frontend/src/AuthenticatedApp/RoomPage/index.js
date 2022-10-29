import socket from "../../api/matching";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { useEffect, useState } from "react";
import RoomPageHeader from "./Header";
import RoomPageContent from "./Content";
import { Alert, Snackbar } from "@mui/material";
import { RoomContext, useRoomContext, useRoomContextProvider } from "../../hooks/useRoomContext";
import { EDITOR_LANGUAGE_OPTIONS } from "../../utils/constants";

const sx = {
  alert: { width: "100%" }
}

const RoomPage = () => {
  const { partnerUsername, editorLanguage, setEditorLanguage } = useRoomContext()
  const { userDetails} = useAuthContext();

  const [openUserLeftSnackbar, setOpenUserLeftSnackbar] = useState(false)
  const [openLanguageSnackbar, setOpenLanguageSnackbar] = useState(false)

  socket.on('disconnect', () => {
    socket.emit('user disconnected', { userName: userDetails.username });
  });

  socket.on('matched user left room', () => {
    setOpenUserLeftSnackbar(true)
  })

  socket.on('language changed', ({ language }) => {
    setEditorLanguage(EDITOR_LANGUAGE_OPTIONS.find(o => o.name === language))
    // TODO: update language settings in settings modal too
  })

  useEffect(() => {
    if (editorLanguage) {
      setOpenLanguageSnackbar(true)
    }
  }, [editorLanguage])

  const alertUser = (e) => {
    e.preventDefault()
    e.returnValue = ''
  }

  useEffect(() => {
    window.addEventListener('beforeunload', alertUser)

    return () => {
      socket.off('disconnect');
      socket.off('matched user left room');
      socket.emit('user leave room', { userName: userDetails.username });
      window.removeEventListener('beforeunload', alertUser)
    }
  }, [])

  const closeUserLeftSnackbar = () => setOpenUserLeftSnackbar(false);
  const closeLanguageSnackbar = () => setOpenLanguageSnackbar(false);

  return (
    <>
      <RoomPageHeader />
      <RoomPageContent />
      <Snackbar open={openUserLeftSnackbar} autoHideDuration={5000} onClose={closeUserLeftSnackbar}>
        <Alert onClose={closeUserLeftSnackbar} variant="filled" severity="info" color="primary" sx={sx.alert}>
          {`Partner ${partnerUsername} has left room`}
        </Alert>
      </Snackbar>
      <Snackbar open={openLanguageSnackbar} autoHideDuration={5000} onClose={closeLanguageSnackbar}>
        <Alert onClose={closeLanguageSnackbar} variant="filled" severity="info" color="primary" sx={sx.alert}>
          {`Editor language set to ${editorLanguage.name}`}
        </Alert>
      </Snackbar>
    </>
  );
}

function RoomPageWrapper() {
  const roomContextValue = useRoomContextProvider()
  return (
    <RoomContext.Provider value={roomContextValue}>
      <RoomPage />
    </RoomContext.Provider>
  );
}

export default RoomPageWrapper;