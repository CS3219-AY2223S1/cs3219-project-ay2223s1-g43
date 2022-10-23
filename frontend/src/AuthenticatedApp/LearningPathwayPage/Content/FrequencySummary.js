import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import SummarySkeleton from "./SummarySkeleton";

const sx = {
  card: {
    height: "240px",
    width: "100%"
  },
  content: {
    height: "100%",
  }
}

const FrequencySummary = (props) => {
  const { freqMap } = props;

  return (
    <Card variant="outlined" sx={sx.card}>
      <CardContent sx={sx.content}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={sx.content}
        >
          {freqMap
            ? <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Typography variant="h4">{freqMap.day} sessions today</Typography>
              <Typography variant="h6">{freqMap.week} sessions this week</Typography>
              <Typography variant="body1">{freqMap.month} sessions this month</Typography>
            </Stack>
            : <SummarySkeleton />}
        </Box>
      </CardContent>
    </Card>
  )
}

export default FrequencySummary