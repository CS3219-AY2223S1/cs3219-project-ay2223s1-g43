import {
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";

const sx = {
  container: {
    width: "300px",
  },
  header: {
    py: 1
  }
}

const SignUpForm = (props) => {
  const { signUp } = props;
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSignup = async () => {
    await signUp(username, password)
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={sx.container}
    >
      <Typography variant={"h3"} sx={sx.header}>Sign up</Typography>
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        fullWidth
        onChange={(e) => setUsername(e.target.value)}
        autoFocus
      />
      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
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
          label="Password"
        />
      </FormControl>
      <Button variant="outlined" size="large" fullWidth onClick={handleSignup}>
        Sign up
      </Button>
      <Divider flexItem />
      <Link component={RouterLink} to="/login">
        Already have an account? Sign in here
      </Link>
    </Stack>
  )
}

export default SignUpForm;
