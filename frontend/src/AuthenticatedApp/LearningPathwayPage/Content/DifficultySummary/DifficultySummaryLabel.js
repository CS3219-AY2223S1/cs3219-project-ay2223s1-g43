import { Stack, Typography } from "@mui/material";
import Brightness1Icon from '@mui/icons-material/Brightness1';

const DifficultySummaryLabel = (props) => {
  const { entry } = props

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      key={entry.name}
    >
      <Brightness1Icon style={{ color: entry.color }} />
      <Typography variant="h6">
        {`${entry.name}: ${entry.value}`}
      </Typography>
    </Stack>
  )
}

export default DifficultySummaryLabel;