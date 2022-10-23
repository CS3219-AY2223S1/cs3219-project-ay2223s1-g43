import { CircularProgress, Dialog, DialogContent, Stack, Typography } from "@mui/material";

const SaveAttemptDialog = (props) => {
  const { open } = props

  return (
    <Dialog
      open={open}
    >
      <DialogContent>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <CircularProgress />
          <Typography variant="body2" align="center">
            Saving attempt...
          </Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

export default SaveAttemptDialog