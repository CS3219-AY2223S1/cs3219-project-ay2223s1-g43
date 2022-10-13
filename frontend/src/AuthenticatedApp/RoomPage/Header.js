import { Box, Button, Stack } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from "react-router-dom";
import AvatarMenu from "../../components/Header/AvatarMenu";

const sx = {
  header: {
    top: 0,
    position: "sticky",
    backgroundColor: "background.default",
    height: "48px",
    zIndex: 100,
    px: 2,
    borderBottom: 1,
    borderColor: 'primary.main',
  }
}

const RoomPageHeader = () => {
  const navigate = useNavigate()

  const leaveRoom = () => {
    navigate("/")
  }

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={0}
      sx={sx.header}
    >
      <Button onClick={leaveRoom}>
        <ArrowBackIosIcon fontSize="small"/>
        Leave Room
      </Button>

      <AvatarMenu />
    </Stack>
  )
}

export default RoomPageHeader;