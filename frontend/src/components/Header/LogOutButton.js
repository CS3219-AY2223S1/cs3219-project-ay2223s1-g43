import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/auth/useAuth";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import WarningDialog from "../WarningDialog";

const LogOutButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogMsg, setDialogMsg] = useState("")
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuthContext();


  const logUserOut = async () => {
    try {
      await logOut();
      setIsLoggedIn(false)
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
      <Button variant="text" onClick={logUserOut}>Log Out</Button>
      <WarningDialog dialogMsg={dialogMsg} isDialogOpen={isDialogOpen} closeDialog={closeDialog} />
    </>
  )
}

export default LogOutButton;