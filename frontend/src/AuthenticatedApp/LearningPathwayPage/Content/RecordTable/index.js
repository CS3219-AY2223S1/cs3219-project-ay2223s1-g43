import { CircularProgress, Paper, Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Box, } from "@mui/material"
import RecordRow from "./RecordRow"

const sx = {
  loadingRow: {
    py: 8
  }
}

const RecordTable = (props) => {
  const { data } = props

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
          {data ?
            data.map((row) => (
              <RecordRow key={row._id} row={row} />
            ))
            : <TableRow>
            <TableCell
              align="center"
              colSpan={6}
              sx={sx.loadingRow}
              >
              <CircularProgress />
            </TableCell>
          </TableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default RecordTable;