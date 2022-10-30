import { Box, Collapse, Grid, TableCell, TableRow } from "@mui/material"
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import RecordRowQuestion from "./RecordRowQuestion";
import QuestionDisplaySkeleton from "../../../components/QuestionDisplay/QuestionDisplaySkeleton";
import { EDITOR_LANGUAGE_OPTIONS } from "../../../../utils/constants";

const sx = {
  box: {
    my: 3,
    height: "100%",
    width: "100%",
  },
  cell: {
    paddingBottom: 0,
    paddingTop: 0,
  },
  fullSize: {
    height: "100%",
    width: "100%",
  },
  gridItem: {
    px: 1
  }
}

const RecordRowDetails = (props) => {
  const { open, code, codeLanguage, questionId, questionDifficulty } = props

  return (
    <TableRow>
      <TableCell style={sx.cell} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={sx.box}>
            <Grid container sx={sx.fullSize}>
              <Grid item xs={12} lg={6} sx={sx.gridItem}>
                {open
                  ? <RecordRowQuestion questionId={questionId} questionDifficulty={questionDifficulty} />
                  : <QuestionDisplaySkeleton/>}
              </Grid>
              <Grid item xs={12} lg={6} sx={sx.gridItem}>
                <CodeMirror
                  value={code}
                  width='100%'
                  theme={dracula}
                  extensions={[
                    (EDITOR_LANGUAGE_OPTIONS.find(o => o.name.toUpperCase() === codeLanguage)?.value?.language()),
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