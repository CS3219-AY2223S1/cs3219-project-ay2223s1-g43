import socket from "../../api/matching";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { useEffect, useState } from "react";
import RoomPageHeader from "./Header";
import RoomPageContent from "./Content";
import { Alert, Snackbar } from "@mui/material";
import { RoomContext, useRoomContext, useRoomContextProvider } from "../../hooks/useRoomContext";

const sx = {
  alert: { width: "100%" }
}

const RoomPage = () => {
  const { partnerUsername } = useRoomContext()

  const { userDetails } = useAuthContext();

  const [openSnackbar, setOpenSnackbar] = useState(false)

  socket.on('disconnect', () => {
    socket.emit('user disconnected', { userName: userDetails.username });
  });

  socket.on('matched user left room', () => {
    setOpenSnackbar(true)
  })

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

  const closeSnackbar = () => setOpenSnackbar(false);

  return (
    <>
      <RoomPageHeader />
      <RoomPageContent />
      <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={closeSnackbar}>
        <Alert onClose={closeSnackbar} variant="filled" severity="info" color="primary" sx={sx.alert}>
          {`Partner ${partnerUsername} has left room`}
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