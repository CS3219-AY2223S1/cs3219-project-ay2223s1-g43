import { Box, Container, Grid } from "@mui/material"
import QuestionDisplay from "./QuestionDisplay"
import Editor from "../../components/Editor";

const sx = {
  content: {
    my: 4
  },
  column: {
    height: `calc(100vh - 108px)`,
    overflowY: "auto"
  }
}

const RoomPageContent = (props) => {
  const { question, userName, room, password } = props
  return (
    <Container maxWidth="xl" sx={sx.content}>
      <Grid container columnSpacing={4}>
        <Grid item xs={6}>
          <Box sx={sx.column}>
            <QuestionDisplay question={question} />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={sx.column}>
            <Editor username={userName} room={room} password={password} height={sx.column.height} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default RoomPageContent