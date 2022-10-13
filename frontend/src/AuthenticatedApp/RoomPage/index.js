import socket from "../../api/matching";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { useEffect, useState } from "react";
import RoomPageHeader from "./Header";
import RoomPageContent from "./Content";
import useQuestion from "../../hooks/auth/useQuestion";

const RoomPage = () => {
  const [question, setQuestion] = useState(null)
  const { username: userName } = useAuthContext()
  const { getQuestion } = useQuestion();

  useEffect(() => {
    const loadQuestion = async () => {
      const q = await getQuestion()
      setQuestion(q)
    }

    loadQuestion()

    socket.on('disconnect', () => {
      socket.emit('user disconnected', { userName });
    });

    socket.on('matched user left room', () => {
      // TODO: add snackbar to inform remaining user
      console.log(`Partner of user ${userName} has left the room`)
    })

    return () => {
      socket.off('disconnect');
      socket.off('matched user left room');
      socket.emit('user leave room', { userName });
    }
  }, [])

  return (
    <>
      <RoomPageHeader/>
      <RoomPageContent question={question}/>
    </>
  );
}

export default RoomPage;