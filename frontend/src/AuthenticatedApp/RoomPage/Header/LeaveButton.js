import { Button } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useState } from "react";
import ConfirmLeaveDialog from "./ConfirmLeaveDialog";
import SaveAttemptDialog from "./SaveAttemptDialog";
import { useNavigate } from "react-router-dom";
import { useRoomContext } from "../../../hooks/useRoomContext";

const LeaveButton = () => {
  const [openLeaveDialog, setOpenLeaveDialog] = useState(false)
  const [openSaveDialog, setOpenSaveDialog] = useState(false)
  const navigate = useNavigate()
  const { saveRecord } = useRoomContext()

  const confirmLeave = async () => {
    setOpenSaveDialog(true)

    try {
      await saveRecord()
      navigate("/")
    } catch (e) {
      // TODO: handle bad requests
    }
  }

  const handleClose = () => {
    setOpenLeaveDialog(false)
  }

  return (
    <>
      <Button onClick={() => setOpenLeaveDialog(true)}>
        <ArrowBackIosIcon fontSize="small" />
        Leave Room
      </Button>
      <ConfirmLeaveDialog open={openLeaveDialog} handleClose={handleClose} confirmLeave={confirmLeave} />
      <SaveAttemptDialog open={openSaveDialog}/>
    </>
  )
}

export default LeaveButton