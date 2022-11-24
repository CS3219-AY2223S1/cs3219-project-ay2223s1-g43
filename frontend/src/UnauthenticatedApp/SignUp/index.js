import { Box } from "@mui/material";
import { useState } from "react";
import useAuth from "../../hooks/auth/useAuth";
import Header from "../../components/Header";
import SignUpDialog from "./SignUpDialog";
import SignUpForm from "./SignUpForm";

const sx = {
    container: {
        display: "flex",
        justifyContent: "center",
        py: "128px"
    }
}

const Signup = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState("")
    const [dialogMsg, setDialogMsg] = useState("")
    const [isSignupSuccess, setIsSignupSuccess] = useState(false)

    const { signUp } = useAuth()

    const handleSignup = async (username, password) => {
        setIsSignupSuccess(false)
        try {
            await signUp(username, password);
            setSuccessDialog('Account successfully created')
            setIsSignupSuccess(true)
        } catch (err) {
            setErrorDialog(err.message)
        }
    }

    const closeDialog = () => setIsDialogOpen(false)

    const setSuccessDialog = (msg) => {
        setDialogTitle('Success')
        setDialogMsg(msg)
        setIsDialogOpen(true)
    }

    const setErrorDialog = (msg) => {
        setDialogTitle('Error')
        setDialogMsg(msg)
        setIsDialogOpen(true)
    }

    return (
        <>
            <Header />
            <Box sx={sx.container} >
                <SignUpForm signUp={handleSignup} />
                <SignUpDialog dialogTitle={dialogTitle} dialogMsg={dialogMsg}
                    isSignupSuccess={isSignupSuccess} isDialogOpen={isDialogOpen} closeDialog={closeDialog} />
            </Box>
        </>

    )
}

export default Signup;
