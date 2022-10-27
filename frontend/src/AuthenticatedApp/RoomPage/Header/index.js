import { Stack } from "@mui/material";
import SettingsMenu from "../../components/Header/SettingsMenu";
import LeaveButton from "./LeaveButton";

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

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={0}
      sx={sx.header}
    >
      <LeaveButton/>
      <SettingsMenu />
    </Stack>
  )
}

export default RoomPageHeader;