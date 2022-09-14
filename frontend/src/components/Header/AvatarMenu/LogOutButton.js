import { MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/auth/useAuth";

const LogOutButton = (props) => {
  const { setErrorDialog } = props;
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const logUserOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      setErrorDialog(err.message)
    }
  }

  return (
    <MenuItem onClick={logUserOut}>
      Log Out
    </MenuItem>
  )
}

export default LogOutButton;