import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const ActionButtons = () => {
  return (
    <Stack direction="row" spacing={1.5} >
      <Button variant="text" component={Link} to="/login">Log in</Button>
      <Button variant="contained" component={Link} to="/signup">Try MeetCode now</Button>
    </Stack>
  )
}

export default ActionButtons;