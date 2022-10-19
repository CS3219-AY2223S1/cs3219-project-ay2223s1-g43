import socket from "../../api/matching";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { useEffect, useState } from "react";
import RoomPageHeader from "./Header";
import RoomPageContent from "./Content";
import useQuestion from "../../hooks/useQuestion";
import { Alert, Snackbar } from "@mui/material";

const sx = {
  alert: { width: "100%" }
}

const RoomPage = () => {
  const [question, setQuestion] = useState(null)
  const { getQuestion } = useQuestion();
  const { username: userName } = useAuthContext();
  const { state } = useLocation();
  const { room, password } = state;

  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [partnerUsername, setPartnerUsername] = useState("");

  useEffect(() => {
    const loadQuestion = async () => {
      const q = await getQuestion()
      setQuestion(q)
    }

    loadQuestion()

    socket.emit('get partner name', { userName }, (response) => {
      setPartnerUsername(response.partnerUsername)
    });

    socket.on('disconnect', () => {
      socket.emit('user disconnected', { userName });
    });

    socket.on('matched user left room', () => {

      setOpenSnackbar(true)
    })

    return () => {
      socket.off('disconnect');
      socket.off('matched user left room');
      socket.emit('user leave room', { userName });
    }
  }, [])

  const closeSnackbar = () => setOpenSnackbar(false);

  return (
    <>
      <RoomPageHeader />
      <RoomPageContent question={question} username={userName} room={room} password={password} />
      <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={closeSnackbar}>
        <Alert onClose={closeSnackbar} variant="filled" severity="info" color="primary" sx={sx.alert}>
          {`Partner ${partnerUsername} has left room`}
        </Alert>
      </Snackbar>
    </>
  );
}

export default RoomPage;