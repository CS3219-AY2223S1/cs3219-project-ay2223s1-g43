import { IconButton, TableCell, TableRow } from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from "react";
import RecordRowDetails from "./RecordRowDetails";

const sx = {
  row: {
    '& > *': { borderBottom: 'unset' }
  }
}

const RecordRow = (props) => {
  const { row } = props
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={sx.row}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {new Date(row.timestamp).toLocaleString()}
        </TableCell>
        <TableCell>{row.question_difficulty.charAt(0) + row.question_difficulty.slice(1).toLowerCase()}</TableCell>
        <TableCell>{row.question_title}</TableCell>
        <TableCell>{row.partner_username}</TableCell>
      </TableRow>
      <RecordRowDetails
        open={open}
        code={row.code}
        codeLanguage={row.code_language}
        questionDifficulty={row.question_difficulty}
        questionId={row.question_id}
      />
    </>
  )
}

export default RecordRow;