import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useAuthContext } from "../../../hooks/auth/useAuthContext";

const DeleteAccountModal = (props) => {
  const { isDialogOpen, closeDialog } = props;
  const { username } = useAuthContext()

  const [textValue, setTextValue] = useState("");

  const handleChange = (event) => {
    setTextValue(event.target.value);
  };

  const deleteAccount = () => {
    // TODO: connect to API
  }

  return (
    <Dialog
      open={isDialogOpen}
      onClose={closeDialog}
    >
      <DialogTitle>Delete Account</DialogTitle>
      <DialogContent>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1.5}
        >
          <Alert severity="warning">
            <AlertTitle>This action is irreversible!</AlertTitle>
            To confirm, type your username in the text field below.
          </Alert>
          <TextField
            label={`Type ${username} to confirm`}
            variant="outlined"
            fullWidth
            value={textValue}
            onChange={handleChange}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button disabled={textValue !== username} >Confirm</Button>
      </DialogActions>
    </Dialog>
  );

}

export default DeleteAccountModal;