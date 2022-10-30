import { Stack, Typography } from "@mui/material"

const sx = {
  stack: {
    py: 24
  }
}

const NoRecordDisplay = () => {
  return (
    <Stack
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      spacing={2}
      sx={sx.stack}
    >
      <Typography variant="h4">No records found</Typography>
      <Typography variant="h6">Complete a session first!</Typography>
    </Stack>
  )
}

export default NoRecordDisplay