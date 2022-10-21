import { Box, Collapse, TableCell, TableRow } from "@mui/material"
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { javascript } from '@codemirror/lang-javascript';

const sx = {
  box: {
    margin: 1
  },
  cell: {
    paddingBottom: 0,
    paddingTop: 0
  }
}

const RecordRowDetails = (props) => {
  const { open, code, questionId } = props

  // TODO: retrieve question and display

  return (
    <TableRow>
      <TableCell style={sx.cell} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={sx.box}>
            <CodeMirror
              value={code}
              width='100%'
              theme={dracula}
              extensions={[
                javascript({ jsx: true }),
              ]}
              editable={false}
              readOnly
            />
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  )
}

export default RecordRowDetails;