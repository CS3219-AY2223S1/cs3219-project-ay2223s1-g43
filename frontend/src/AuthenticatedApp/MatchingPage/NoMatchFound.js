import { Button, Stack, Typography } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useNavigate } from "react-router-dom";

const sx = {
  icon: { fontSize: "120px" }
}

const NoMatchFound = (props) => {
  const { tryAgain } = props
  const navigate = useNavigate();

  const cancel = () => {
    navigate("/")
  }

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}>
      <CancelOutlinedIcon color="error" sx={sx.icon} />
      <Typography variant="h6">No match found</Typography>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Button variant="contained" onClick={tryAgain} >Try again</Button>
        <Button variant="text" onClick={cancel} color="error">Cancel</Button>
      </Stack>
    </Stack>
  )
}

export default NoMatchFound;