import { Box, Container, Grid, useMediaQuery } from "@mui/material"
import QuestionDisplay from "../components/QuestionDisplay"
import Editor from "../components/Editor";
import { useRoomContext } from "../../hooks/useRoomContext";
import { useTheme } from "@emotion/react";
import QuestionDisplayModal from "../components/QuestionDisplay/QuestionDisplayModal";

const sx = {
  content: {
    my: 4
  },
  column: {
    height: `calc(100vh - 108px)`,
    overflowY: "auto"
  }
}

const RoomPageContent = () => {
  const { question, room, ydoc, yText, editorTheme, editorLanguage } = useRoomContext();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container maxWidth="xl" sx={sx.content}>
      <Grid container columnSpacing={4}>
        <Grid item xs={12} md={6}>
          {matches
            ? <QuestionDisplayModal question={question} />
            : <Box sx={sx.column}>
              <QuestionDisplay question={question} />
            </Box>
          }
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={sx.column}>
            <Editor
              room={room}
              height={sx.column.height}
              ydoc={ydoc}
              yText={yText}
              editorTheme={editorTheme}
              editorLanguage={editorLanguage}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default RoomPageContent