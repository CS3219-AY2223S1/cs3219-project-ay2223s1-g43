import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const ConfirmLeaveDialog = (props) => {
  const { open, handleClose, confirmLeave } = props

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure you want to leave?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This will be considered the end of the practice session and your attempt will be saved.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={confirmLeave}>
          Leave
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmLeaveDialog