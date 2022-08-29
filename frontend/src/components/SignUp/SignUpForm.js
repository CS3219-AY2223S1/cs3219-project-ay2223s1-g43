import { Divider, Link, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AuthForm from "./AuthForm";

const sx = {
  container: {
    width: "300px",
  },
  header: {
    pb: 1
  }
}

const SignUpForm = (props) => {
  const { signUp } = props;

  const handleSignup = async (username, password) => {
    await signUp(username, password)
  }

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
      sx={sx.container}
    >
      <AuthForm formTitle="Sign up" submitForm={handleSignup} />
      <Divider flexItem />
      <Link component={RouterLink} to="/login">
        Already have an account? Log in here
      </Link>
    </Stack>
  )
}

export default SignUpForm;
