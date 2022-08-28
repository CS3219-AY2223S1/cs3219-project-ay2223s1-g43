import { Box } from "@mui/material";
import { useState } from "react";
import { usersAPI } from "../../../api/users";
import SignUpDialog from "./SignUpDialog";
import SignUpForm from "./SignUpForm";

const SignupPage = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState("")
    const [dialogMsg, setDialogMsg] = useState("")
    const [isSignupSuccess, setIsSignupSuccess] = useState(false)

    const handleSignup = async (username, password) => {
        setIsSignupSuccess(false)
        try {
            await usersAPI.handleSignup(username, password);
            setSuccessDialog('Account successfully created')
            setIsSignupSuccess(true)
        } catch (err) {
            console.log(err)
            setErrorDialog(err.message)
        }
    }

    const closeDialog = () => setIsDialogOpen(false)

    const setSuccessDialog = (msg) => {
        setIsDialogOpen(true)
        setDialogTitle('Success')
        setDialogMsg(msg)
    }

    const setErrorDialog = (msg) => {
        setIsDialogOpen(true)
        setDialogTitle('Error')
        setDialogMsg(msg)
    }

    return (
        <Box display={"flex"} flexDirection={"column"} width={"30%"}>
            <SignUpForm signUp={handleSignup} />
            <SignUpDialog dialogTitle={dialogTitle} dialogMsg={dialogMsg}
                isSignupSuccess={isSignupSuccess} isDialogOpen={isDialogOpen} closeDialog={closeDialog} />
        </Box>
    )
}

export default SignupPage;
