import { Button, Dialog, DialogActions, DialogContent, Stack, Typography } from "@mui/material";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const sx = {
  icon: { fontSize: "48px" }
}

const FailedSaveDialog = (props) => {
  const { open, tryAgain, cancel } = props

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
          <CancelOutlinedIcon color="error" sx={sx.icon} />
          <Typography variant="h6">Could not save attempt</Typography>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Button onClick={cancel} color="error">Cancel</Button>
            <Button onClick={tryAgain}>Try Again</Button>
          </Stack>
        </Stack>
      </DialogContent>

    </Dialog>
  )
}

export default FailedSaveDialog;