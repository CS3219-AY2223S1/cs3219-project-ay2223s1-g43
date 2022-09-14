import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const WarningDialog = (props) => {
  const { dialogMsg, isDialogOpen, closeDialog } = props;

  return (
    <Dialog
      open={isDialogOpen}
      onClose={closeDialog}
    >
      <DialogTitle>Error</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogMsg}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Okay</Button>
      </DialogActions>
    </Dialog>);
}

export default WarningDialog;