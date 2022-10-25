import { Box, CircularProgress } from "@mui/material";

const sx = {
  box: {
    height: "100%",
    width: "100%"
  }
}

const SummarySkeleton = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={sx.box}
    >
      <CircularProgress size="4rem" />
    </Box>
  )
}

export default SummarySkeleton;