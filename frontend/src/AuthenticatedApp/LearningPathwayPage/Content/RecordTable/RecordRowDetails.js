import { Box, Collapse, Grid, TableCell, TableRow } from "@mui/material"
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { javascript } from '@codemirror/lang-javascript';
import RecordRowQuestion from "./RecordRowQuestion";
import QuestionDisplaySkeleton from "../../../components/QuestionDisplay/QuestionDisplaySkeleton";

const sx = {
  box: {
    my: 3,
    height: "100%",
    width: "100%",
    // backgroundColor: "cyan",
  },
  cell: {
    paddingBottom: 0,
    paddingTop: 0,
    // backgroundColor: "cyan",
  },
  fullSize: {
    height: "100%",
    width: "100%",
    // backgroundColor: "cyan",
  },
  gridItem: {
    px: 1
  }
}

const RecordRowDetails = (props) => {
  const { open, code, questionId, questionDifficulty } = props

  return (
    <TableRow>
      <TableCell style={sx.cell} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={sx.box}>
            <Grid container sx={sx.fullSize}>
              <Grid xs={12} lg={6} sx={sx.gridItem}>
                {open
                  ? <RecordRowQuestion questionId={questionId} questionDifficulty={questionDifficulty} />
                  : <QuestionDisplaySkeleton/>}
              </Grid>
              <Grid xs={12} lg={6} sx={sx.gridItem}>
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
              </Grid>
            </Grid>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  )
}

export default RecordRowDetails;