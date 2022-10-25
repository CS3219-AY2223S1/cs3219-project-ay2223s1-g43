import { Button } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useState } from "react";
import ConfirmLeaveDialog from "./ConfirmLeaveDialog";
import SaveAttemptDialog from "./SaveAttemptDialog";
import { useNavigate } from "react-router-dom";
import { useRoomContext } from "../../../hooks/useRoomContext";
import FailedSaveDialog from "./FailedSaveDialog";

const LeaveButton = () => {
  const [openLeaveDialog, setOpenLeaveDialog] = useState(false)
  const [openSaveDialog, setOpenSaveDialog] = useState(false)
  const [openFailDialog, setOpenFailDialog] = useState(false)
  const navigate = useNavigate()
  const { saveRecord } = useRoomContext()

  const confirmLeave = async () => {
    setOpenLeaveDialog(false)
    setOpenFailDialog(false)
    setOpenSaveDialog(true)

    try {
      await saveRecord()
      navigate("/")
    } catch (e) {
      setTimeout(() => {
        setOpenSaveDialog(false)
        setOpenFailDialog(true)
      }, 1500);
    }
  }

  const cancelSave = () => {
    navigate("/")
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
      <SaveAttemptDialog open={openSaveDialog} />
      <FailedSaveDialog open={openFailDialog} cancel={cancelSave} tryAgain={confirmLeave} />
    </>
  )
}

export default LeaveButton