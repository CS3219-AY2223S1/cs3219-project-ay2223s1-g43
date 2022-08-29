import { Stack } from "@mui/material";
import ActionButtons from "./ActionButtons";
import Logo from "./Logo";

const sx = {
  header : {
    position: "sticky",
    zIndex: 100,
    height: "64px",
    px: 2,
    borderBottom: 1,
    borderColor: 'primary.main'
  }
}

const Header = () => {
  return (
  <Stack
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    spacing={0}
    sx={sx.header}
  >
    <Logo/>
    <ActionButtons/>
  </Stack>
  )
}

export default Header;