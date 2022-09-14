import { Button, Stack, Typography } from "@mui/material";
import LoadingIcon from "./LoadingIcon";
import { useNavigate } from "react-router-dom";

const FindingPage = (props) => {
  const { setTimerExpired } = props;
  const navigate = useNavigate();

  const cancel = () => {
    setTimerExpired();
    navigate("/")
  }

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}>
      <LoadingIcon setTimerExpired={setTimerExpired} />
      <Typography variant="h6">Waiting for a match...</Typography>
      <Button variant="text" onClick={cancel} color="error">Cancel</Button>
    </Stack>
  )
}

export default FindingPage;