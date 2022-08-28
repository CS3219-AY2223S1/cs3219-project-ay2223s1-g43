import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

const SignUpForm = (props) => {
  const { signUp } = props;
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSignup = async () => {
    await signUp(username, password)
  }

  return (
    <>
      <Typography variant={"h3"} marginBottom={"2rem"}>Sign Up</Typography>
      <TextField
        label="Username"
        variant="standard"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ marginBottom: "1rem" }}
        autoFocus
      />
      <TextField
        label="Password"
        variant="standard"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ marginBottom: "2rem" }}
      />
      <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
        <Button variant={"outlined"} onClick={handleSignup}>Sign up</Button>
      </Box>
    </>
  )
}

export default SignUpForm;
