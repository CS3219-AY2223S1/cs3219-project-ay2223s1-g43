import { Box, Divider, Link, Stack } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/auth/useAuth";
import Header from "../../components/Header";
import AuthForm from "../SignUp/AuthForm";
import { useState } from "react";
import WarningDialog from "../../components/WarningDialog";

const sx = {
    container: {
        display: "flex",
        justifyContent: "center",
        py: "128px"
    },
    stack: {
        width: "300px",
    },
    header: {
        pb: 1
    }
}

const Login = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dialogMsg, setDialogMsg] = useState("")
    const { logIn } = useAuth()
    const navigate = useNavigate();

    const handleLogin = async (username, password) => {
        try {
            await logIn(username, password)
            navigate("/");
        } catch (err) {
            setErrorDialog(err.message)
        }
    }

    const setErrorDialog = (msg) => {
        setDialogMsg(msg)
        setIsDialogOpen(true)
    }

    const closeDialog = () => setIsDialogOpen(false)

    return (
        <>
            <Header />
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
                <WarningDialog
                    dialogMsg={dialogMsg}
                    isDialogOpen={isDialogOpen}
                    closeDialog={closeDialog}
                />
            </Box>
        </>

    )
}

export default Login;
