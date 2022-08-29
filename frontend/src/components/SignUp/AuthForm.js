import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const sx = {
  container: {
    width: "300px",
  },
  header: {
    pb: 1
  }
}

// TODO: consider strengthening form validation
const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
}).required();

const AuthForm = (props) => {
  const { formTitle, submitForm } = props;
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmission = async (data) => {
    await submitForm(data.username, data.password)
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  return (
    <form onSubmit={handleSubmit(handleSubmission)}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={sx.container}
      >
        <Typography variant={"h3"} sx={sx.header}>{formTitle}</Typography>
        <Controller
          name="username"
          control={control}
          defaultValue=''
          render={({ field }) =>
            <TextField
              label="username"
              variant="outlined"
              fullWidth
              {...field}
              autoFocus
              error={errors.username}
              helperText={errors.username?.message}
            />}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=''
          render={({ field }) =>
            <FormControl variant="outlined" fullWidth error={errors.password} >
              <InputLabel htmlFor="outlined-adornment-password" >Password</InputLabel>
              <OutlinedInput
                id="password"
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
                label="Password"
              />
              <FormHelperText >{errors.password?.message}</FormHelperText>
            </FormControl>}
        />
        <Button variant="outlined" size="large" fullWidth type="submit">
          {formTitle}
        </Button>
      </Stack>
    </form>
  )

}

export default AuthForm;