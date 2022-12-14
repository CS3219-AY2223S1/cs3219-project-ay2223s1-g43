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
import useAuth from "../../../../hooks/auth/useAuth";
import { useAuthContext } from "../../../../hooks/auth/useAuthContext";

const DeleteAccountModal = (props) => {
  const { isDialogOpen, closeDialog } = props;
  const { userDetails } = useAuthContext()
  const {deleteAccount} = useAuth()

  const [textValue, setTextValue] = useState("");

  const handleChange = (event) => {
    setTextValue(event.target.value);
  };

  const deleteUserAccount = async () => {
    await deleteAccount()
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
            label={`Type ${userDetails.username} to confirm`}
            variant="outlined"
            fullWidth
            value={textValue}
            onChange={handleChange}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button disabled={textValue !== userDetails.username} onClick={deleteUserAccount}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );

}

export default DeleteAccountModal;