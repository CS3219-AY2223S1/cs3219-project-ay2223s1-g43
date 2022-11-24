import { Box } from "@mui/material";
import { Cell, Pie, PieChart } from "recharts";

const DifficultySummaryChart = (props) => {
  const { data } = props

  return (
    <Box>
      <PieChart width={200} height={200}>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={80} stroke="none">
          {data.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
        </Pie>
      </PieChart>
    </Box>
  )
}

export default DifficultySummaryChart;