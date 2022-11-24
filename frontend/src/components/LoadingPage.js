import { Box, CircularProgress } from "@mui/material";

const LoadingPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh">
      <CircularProgress size="4rem" />
    </Box>
  )
}
export default LoadingPage;