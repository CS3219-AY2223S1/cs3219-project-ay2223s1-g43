import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
  Stack,
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import useAuth from "../../../../hooks/auth/useAuth";

const sx = {
  alert: { width: "100%" }
}

const schema = yup.object({
  oldPassword: yup.string().required("No password provided").matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.{8,})/,
    "Password should be at least 8 characters long, and contain at least 1 uppercase and 1 lowercase character."
  ),
  newPassword: yup.string().required("No password provided").matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.{8,})/,
    "Password should be at least 8 characters long, and contain at least 1 uppercase and 1 lowercase character."
  ),
}).required();

const ChangePasswordModal = (props) => {
  const { isDialogOpen, closeDialog } = props;
  const [showPassword, setShowPassword] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const { changePassword } = useAuth();
  const { handleSubmit, control, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const closeFormDialog = () => {
    reset()
    setErrorMessage("")
    closeDialog();
  }

  const changeUserPassword = async (formFields) => {
    try {
      const { oldPassword, newPassword } = formFields;
      await changePassword(oldPassword, newPassword)
      setOpenSnackbar(true);
      closeFormDialog();
    } catch (err) {
      setErrorMessage(err.message)
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const closeSnackbar = () => setOpenSnackbar(false);

  return (
    <>
      <Dialog
        open={isDialogOpen}
        onClose={closeFormDialog}
        maxWidth="xs"
        fullWidth
      >
        <form onSubmit={handleSubmit(changeUserPassword)}>
          <DialogTitle>Change Password</DialogTitle>
          <DialogContent>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={1.5}
            >
              {errorMessage.length > 0 &&
                <Alert variant="outlined" severity="error" sx={sx.alert}>{errorMessage}</Alert>
              }
              <DialogContentText>Enter your new password below:</DialogContentText>
              <Controller
                name="oldPassword"
                control={control}
                defaultValue=''
                render={({ field }) =>
                  <FormControl variant="outlined" fullWidth error={errors.oldPassword} >
                    <InputLabel htmlFor="outlined-adornment-password">Old Password</InputLabel>
                    <OutlinedInput
                      id="old-password"
                      type={showPassword ? 'text' : 'password'}
                      fullWidth
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      {...field}
                      label="Old Password"
                    />
                    <FormHelperText >{errors.oldPassword?.message}</FormHelperText>
                  </FormControl>
                }
              />
              <Controller
                name="newPassword"
                control={control}
                defaultValue=''
                render={({ field }) =>
                  <FormControl variant="outlined" fullWidth error={errors.newPassword} >
                    <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                    <OutlinedInput
                      id="new-password"
                      type={showPassword ? 'text' : 'password'}
                      fullWidth
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      {...field}
                      label="New Password"
                    />
                    <FormHelperText >{errors.newPassword?.message}</FormHelperText>
                  </FormControl>
                }
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeFormDialog}>Cancel</Button>
            <Button type="submit">Confirm</Button>
          </DialogActions>
        </form>
      </Dialog>
      <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={closeSnackbar}>
        <Alert onClose={closeSnackbar} variant="filled" severity="success" sx={sx.alert}>
          Password was changed successfully!
        </Alert>
      </Snackbar>
    </>
  );

}

export default ChangePasswordModal;