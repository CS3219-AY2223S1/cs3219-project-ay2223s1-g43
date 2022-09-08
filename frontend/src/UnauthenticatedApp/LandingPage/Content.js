import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CodeCollaboration from "./code-collaboration.png"
import useMediaQuery from '@mui/material/useMediaQuery';

const sx = {
  container: {
    p: 2,
    px: 6,
    height: `calc(100% - 64px)`,
    minHeight: "700px"
  },
  imgContainer: {
    maxWidth: "700px",
  },
}

const Content = () => {
  const isBiggerThanLg = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  return (
    <Stack
      direction={isBiggerThanLg ? "row" : "column-reverse"}
      justifyContent={isBiggerThanLg ? "space-between" : "flex-end"}
      alignItems="center"
      sx={sx.container}
      spacing={isBiggerThanLg ? 8 : 2}
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems={isBiggerThanLg ? "flex-start" : "center"}
        spacing={2}
      >
        <Typography variant="h3" component="div">
          Be Prepared.
        </Typography>
        <Typography variant="h6" component="div" align={isBiggerThanLg ? "inherit" : "center"}>
          Practice coding interviews with your peers
        </Typography>
        <Button variant="contained" component={Link} to="/signup">Try MeetCode now</Button>
      </Stack>
      <Box sx={sx.imgContainer}>
        <img src={CodeCollaboration} alt={"code collaboration"} height="100%" width="100%" />
      </Box>
    </Stack>
  )
}

export default Content;