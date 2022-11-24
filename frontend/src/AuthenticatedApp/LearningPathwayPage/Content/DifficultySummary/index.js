import { Card, CardContent, Stack } from "@mui/material";
import { DIFFICULTY_COLORS } from "../../../../utils/constants";
import { useEffect, useState } from "react";
import SummarySkeleton from "../SummarySkeleton";
import DifficultySummaryChart from "./DifficultySummaryChart";
import DifficultySummaryLabel from "./DifficultySummaryLabel";

const sx = {
  card: {
    height: "240px",
    width: "100%"
  },
  content: {
    height: "100%",
    width: "100%"
  }
}

const DifficultySummary = (props) => {
  const { diffMap } = props
  const [data, setData] = useState([])

  useEffect(() => {
    if (diffMap) {
      const d = [{
        "name": "Easy",
        "value": diffMap.EASY,
        "color": DIFFICULTY_COLORS.EASY
      }, {
        "name": "Medium",
        "value": diffMap.MEDIUM,
        "color": DIFFICULTY_COLORS.MEDIUM
      }, {
        "name": "Hard",
        "value": diffMap.HARD,
        "color": DIFFICULTY_COLORS.HARD
      }]
      setData(d)
    }
  }, [diffMap])

  return (
    <Card variant="outlined" sx={sx.card}>
      <CardContent sx={sx.content}>
        {data.length === 3 ?
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >
            <DifficultySummaryChart data={data} />
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >
              {data.map((entry) =>
                <DifficultySummaryLabel key={entry.name} entry={entry} />
              )}
            </Stack>
          </Stack>
          : <SummarySkeleton />}
      </CardContent>
    </Card>
  )
}

export default DifficultySummary