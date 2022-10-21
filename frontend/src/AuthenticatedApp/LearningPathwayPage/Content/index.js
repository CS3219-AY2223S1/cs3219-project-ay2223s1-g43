import { Container, Grid, Stack } from "@mui/material";
import useRecords from "../../../hooks/useRecords";
import DifficultySummary from "./DifficultySummary";
import FrequencySummary from "./FrequencySummary";
import RecordTable from "./RecordTable";

const sx = {
  content: {
    my: 4,
  },
  fullWidth: {
    width: "100%"
  },
  card: {
    height: "240px",
    width: "100%"
  }
}

const LearningPathwayContent = () => {
  const { records, diffMap, freqMap } = useRecords()

  return (
    <Container maxWidth="xl" sx={sx.content}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={sx.fullWidth}
      >
        <Grid container rowSpacing={2} columnSpacing={4}>
          <Grid item xs={12} md={6}>
            <DifficultySummary diffMap={diffMap}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <FrequencySummary freqMap={freqMap}/>
          </Grid>
        </Grid>
        {records ? <RecordTable data={records}/> : ""}
      </Stack>

    </Container>
  )
}

export default LearningPathwayContent;