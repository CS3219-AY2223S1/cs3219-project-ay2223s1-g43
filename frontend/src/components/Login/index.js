import { Box, Divider, Link, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AuthForm from "../SignUp/AuthForm";

const sx = {
    container: {
        display: "flex",
        justifyContent: "center",
        py: "160px"
    },
    stack: {
        width: "300px",
      },
      header: {
        pb: 1
      }
}

const Login = () => {
    const handleLogin = async (username, password) => {
        // TODO: add and call login API
    }

    return (
        <Box sx={sx.container} >
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={3}
                sx={sx.stack}
            >
                <AuthForm formTitle="Log in" submitForm={handleLogin} />
                <Divider flexItem />
                <Link component={RouterLink} to="/signup">
                    Don't have an account? Sign up here
                </Link>
            </Stack>
        </Box>
    )
}

export default Login;
