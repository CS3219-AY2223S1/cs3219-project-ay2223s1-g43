import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import socket from "../../api/matching";
import FindingPage from "./FindingMatch";
import NoMatchFound from "./NoMatchFound";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { useNavigate, useParams } from "react-router-dom";

const MatchingPage = () => {
  const [findingMatch, setFindingMatch] = useState(true);
  const { userDetails } = useAuthContext()
  const { difficulty } = useParams();
  const navigate = useNavigate();
  const userName = userDetails.username

  useEffect(() => {
    socket.on('disconnect', () => {
      socket.emit('user disconnected', { userName });
    });

    socket.emit('user finding match', { userName, difficulty });

    return () => {
      socket.off('disconnect')
      socket.emit('matching timer expired', { userName });
    }
  }, [])

  const setTimerExpired = () => {
    socket.emit('matching timer expired', { userName });
    setFindingMatch(false)
  }

  const tryAgain = () => {
    socket.emit('user finding match', { userName, difficulty });
    setFindingMatch(true)
  }

  socket.on("matchSuccess", (data) => {
    navigate("/room-page", { replace: true, state: { room: data.room, password: data.password, difficulty } });
  })

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      {findingMatch
        ? <FindingPage setTimerExpired={setTimerExpired} />
        : <NoMatchFound tryAgain={tryAgain} />
      }
    </Box>
  )
}

export default MatchingPage;