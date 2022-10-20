import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import socket from "../api/matching";
import * as Y from 'yjs'
import { useAuthContext } from "./auth/useAuthContext";
import useQuestion from "./useQuestion";
import { learningPathwayAPI } from "../api/learningPathway";

export const RoomContext = createContext(null);

export const useRoomContextProvider = () => {
  const [partnerUsername, setPartnerUsername] = useState("");
  const [question, setQuestion] = useState(null);
  const [timeStamp, setTimestamp] = useState(() => (new Date()).toISOString());
  const [codeDoc, setCodeDoc] = useState(() => {
    console.log("computing...")
    const ydoc = new Y.Doc();
    const yText = ydoc.getText("codemirror");

    return { ydoc, yText }
  });

  const { getQuestion } = useQuestion();
  const { userDetails } = useAuthContext();

  const { state } = useLocation();
  const { room, password, difficulty } = state;

  const saveRecord = async () => {
    console.log(question)
    await learningPathwayAPI.handleAddRecord(userDetails.userId, partnerUsername, difficulty.toUpperCase(),
      question.id, question.title, codeDoc.yText.toString(), timeStamp)
  }

  useEffect(() => {
    const loadQuestion = async () => {
      const qn = await getQuestion()
      setQuestion(qn)
    }

    loadQuestion()

    socket.emit('get partner name', { userName: userDetails.username }, (response) => {
      setPartnerUsername(response.partnerUsername)
    });
    return () => {
      console.log("...tearing down")
      if (codeDoc && codeDoc.ydoc) {
        codeDoc.ydoc.destroy();
      }
    };
  }, [])

  return { partnerUsername, question, room, password, ydoc: codeDoc.ydoc, yText: codeDoc.yText, saveRecord };
};

export const useRoomContext = () => {
  const context = useContext(RoomContext);
  if (context === null) {
    throw new Error(
      "useRoomContext should be called in an useRoomContextProvider"
    );
  }
  return context;
};
