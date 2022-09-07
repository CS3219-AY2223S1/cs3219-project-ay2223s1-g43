import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  }

  return (
    <Typography variant="h5" onClick={handleClick}>
      MeetCode
    </Typography>
  )
}

export default Logo;