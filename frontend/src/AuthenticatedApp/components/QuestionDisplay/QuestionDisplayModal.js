import { Box, Button, Dialog, DialogActions } from "@mui/material";
import { useState } from "react";
import QuestionDisplay from ".";

const sx = {
  modalContainer: {
    mb: 1,
  },
  questionDisplayContainer: {
    p: 3,
    overflowY: "auto"
  }
}

const QuestionDisplayModal = (props) => {
  const { question } = props
  const [open, setOpen] = useState(false)

  const onClick = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box sx={sx.modalContainer}>
      <Button onClick={onClick}>Show Question</Button>
      <Dialog open={open} onClose={handleClose} >
        <Box sx={sx.questionDisplayContainer}>
          <QuestionDisplay question={question} />
        </Box>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default QuestionDisplayModal;