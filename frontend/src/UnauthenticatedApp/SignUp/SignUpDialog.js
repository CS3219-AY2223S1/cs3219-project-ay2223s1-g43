import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Link } from "react-router-dom";

const SignUpDialog = (props) => {
  const { dialogTitle, dialogMsg, isSignupSuccess, isDialogOpen, closeDialog } = props;

  return (
    <Dialog
      open={isDialogOpen}
      onClose={closeDialog}
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogMsg}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {isSignupSuccess
          ? <Button component={Link} to="/login">Log in</Button>
          : <Button onClick={closeDialog}>Okay</Button>
        }
      </DialogActions>
    </Dialog>);
}

export default SignUpDialog;