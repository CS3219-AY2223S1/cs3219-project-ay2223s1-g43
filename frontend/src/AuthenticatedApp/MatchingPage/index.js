import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import socket from "../../api/matching";
import FindingPage from "./FindingMatch";
import NoMatchFound from "./NoMatchFound";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { useNavigate, useParams } from "react-router-dom";

const MatchingPage = () => {
  const [findingMatch, setFindingMatch] = useState(true);
  const { username } = useAuthContext()
  const { difficulty } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit('user finding match', {username, difficulty});
    return () => {
      socket.emit('matching timer expired', {username});
    }
  }, [])

  const setTimerExpired = () => {
    socket.emit('matching timer expired', {username});
    setFindingMatch(false)
  }

  const tryAgain = () => {
    socket.emit('user finding match', {username, difficulty});
    setFindingMatch(true)
  }

  socket.on("matchSuccess", () => {
    navigate("/room-page")
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