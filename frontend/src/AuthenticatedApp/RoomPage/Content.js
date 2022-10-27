import { Box, Container, Grid } from "@mui/material"
import QuestionDisplay from "../components/QuestionDisplay"
import Editor from "../components/Editor";
import { useRoomContext } from "../../hooks/useRoomContext";

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

  return (
    <Container maxWidth="xl" sx={sx.content}>
      <Grid container columnSpacing={4}>
        <Grid item xs={6} md={6}>
          <Box sx={sx.column}>
            <QuestionDisplay question={question} />
          </Box>
        </Grid>
        <Grid item xs={6} md={6}>
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