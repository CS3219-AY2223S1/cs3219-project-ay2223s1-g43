import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import socket from "../../api/matching";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { useEffect } from "react";


const RoomPage = () => {
  const { username: userName } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    socket.on('disconnect', () => {
      socket.emit('user disconnected', { userName });
    });

    socket.on('matched user left room', () => {
      console.log(`Partner of user ${userName} has left the room`)
      leaveRoom();
    })

    return () => {
      socket.off('disconnect');
      socket.off('matched user left room');
      socket.emit('user leave room', { userName });
    }
  }, [])

  const leaveRoom = () => {
    navigate("/")
  }

  return (
    <Box>
      <Button onClick={leaveRoom}>Leave Room</Button>
    </Box>
  );
}

export default RoomPage;