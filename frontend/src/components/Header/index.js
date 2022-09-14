import { Box, Stack } from "@mui/material";
import Logo from "./Logo";

const sx = {
  header : {
    top: 0,
    position: "sticky",
    backgroundColor: "background.default",
    height: "64px",
    zIndex: 100,
    px: 2,
    borderBottom: 1,
    borderColor: 'primary.main',
  }
}

const Header = (props) => {
  const {rightContent = <Box/>} = props;

  return (
  <Stack
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    spacing={0}
    sx={sx.header}
  >
    <Logo/>
    {rightContent}
  </Stack>
  )
}

export default Header;