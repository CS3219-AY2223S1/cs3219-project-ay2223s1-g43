import { Paper, Table, TableContainer, TableHead, TableCell, TableBody, TableRow } from "@mui/material"
import RecordRow from "./RecordRow"

const RecordTable = (props) => {
  const { data } = props

  // TODO: add skeleton in future

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Date</TableCell>
            <TableCell>Difficulty</TableCell>
            <TableCell>Question</TableCell>
            <TableCell>Partner</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <RecordRow key={row._id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default RecordTable;